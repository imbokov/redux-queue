import _ from "lodash";

import { FINISH_REQUEST } from "constants/actionTypes";

export const selectors = {
  getEntity: (state, entity, id) => _.get(state, [entity, id], {}),
};

const initialState = {};

const reducer = (state = initialState, { type, payload }) =>
  type === FINISH_REQUEST && payload.entities ? _.merge(state, payload.entities) : state;

export default reducer;
