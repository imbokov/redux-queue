import _ from "lodash";

import { FINISH_REQUEST } from "constants/actionTypes";

export const selectors = {
  getEntity: (state, entity, id) => _.get(state, ["entities", entity, id], {}),
};

const initialState = {};

const reducer = (state = initialState, { type, payload, meta }) => {
  if (type !== FINISH_REQUEST) return state;
  if (payload.entities) {
    return _.merge(state, payload.entities);
  }
  if (meta.deletedEntity && meta.deletedId) {
    const { [meta.deletedId]: deleted, ...entity } = state[meta.deletedEntity];
    return {
      ...state,
      [meta.deletedEntity]: entity,
    };
  }
};

export default reducer;
