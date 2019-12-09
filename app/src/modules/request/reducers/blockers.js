import { START_REQUEST, FINISH_REQUEST } from "constants/actionTypes";

import applyBlockers from "../helpers/applyBlockers";

const initialState = {};

const types = [START_REQUEST, FINISH_REQUEST];

const reducer = (state = initialState, { type, payload }) =>
  types.includes(type) ? applyBlockers(state, payload.blockerPaths, type === START_REQUEST) : state;

export default reducer;
