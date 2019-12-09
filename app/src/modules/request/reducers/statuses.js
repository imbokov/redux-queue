import _ from "lodash";

import { START_REQUEST, FINISH_REQUEST } from "constants/actionTypes";

import getPathsHash from "../helpers/getPathsHash";

const types = [START_REQUEST, FINISH_REQUEST];

const initialState = {};

const reducer = (state = initialState, { type, payload, meta }) =>
  types.includes(type)
    ? _.merge(
        {},
        state,
        _.set(
          {},
          [meta.id, getPathsHash(payload.blockerPaths)],
          type === START_REQUEST
            ? { isFetching: true, error: undefined }
            : { isFetching: false, error: payload.error },
        ),
      )
    : state;

export default reducer;
