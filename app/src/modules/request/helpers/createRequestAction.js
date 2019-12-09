import _ from "lodash";
import { normalize } from "normalizr";

import { ADD_TO_QUEUE, START_REQUEST, FINISH_REQUEST } from "constants/actionTypes";

import applyBlockers from "./applyBlockers";
import getPathsHash from "./getPathsHash";
import lineIsClear from "./lineIsClear";

const lineTickets = {};
let nextRequestId = 1;

const defaultStatus = {
  isFetching: false,
  error: undefined,
};

const createRequestAction = (
  id,
  callback,
  getBlockerPaths,
  { schema, finishMetaCreator = () => {} } = {},
) => {
  const action = (...args) => async (dispatch, getState, apiFetch) => {
    const requestId = nextRequestId++;
    const { blockers: startBlockers } = getState().request;
    const blockerPaths = getBlockerPaths(...args);

    dispatch({ type: ADD_TO_QUEUE, payload: { requestId, blockerPaths }, meta: { id } });

    if (!lineIsClear(startBlockers, blockerPaths)) {
      const lineTicket = new Promise(res => {
        lineTickets[requestId] = res;
      });
      await lineTicket;
    }

    dispatch({ type: START_REQUEST, payload: { requestId, blockerPaths }, meta: { id } });

    await new Promise(res => setTimeout(res, 1000));

    let result;
    let entities;
    let error;
    try {
      const callbackResult = await callback({ dispatch, getState, apiFetch }, ...args);
      if (schema) {
        const normalizeResult = normalize(callbackResult, schema);
        result = normalizeResult.result;
        entities = normalizeResult.entities;
      } else {
        result = callbackResult;
      }
    } catch (e) {
      error = e;
    }

    dispatch({
      type: FINISH_REQUEST,
      payload: { requestId, blockerPaths, result, entities, error },
      meta: { ...finishMetaCreator({ result, entities, error }, ...args), id },
    });

    const { queue: finishQueue, blockers: finishBlockers } = getState().request;
    let draftBlockers = finishBlockers;
    const nextRequestIds = [];
    finishQueue.forEach(nextAction => {
      if (lineIsClear(draftBlockers, nextAction.blockerPaths)) {
        nextRequestIds.push(nextAction.requestId);
        draftBlockers = applyBlockers(draftBlockers, nextAction.blockerPaths, true);
      }
    });
    nextRequestIds.forEach(nextRequestId => {
      lineTickets[nextRequestId]();
      delete lineTickets[nextRequestId];
    });

    if (error && args[args.length - 1] && args[args.length - 1].rethrowError) {
      throw error;
    }
    return { result, entities, error };
  };

  action.toString = () => id;
  action.getIsBlocked = (state, ...args) =>
    !lineIsClear(state.request.blockers, getBlockerPaths(...args));
  action.getStatus = (state, ...args) =>
    _.get(
      state,
      ["request", "statuses", id, getPathsHash(getBlockerPaths(...args))],
      defaultStatus,
    );

  return action;
};

export default createRequestAction;
