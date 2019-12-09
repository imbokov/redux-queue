import { FINISH_REQUEST } from "constants/actionTypes";

const createReducer = (map, initialState) => (state = initialState, action) => {
  if (action.type === FINISH_REQUEST && map[action.meta.id]) {
    return map[action.meta.id](state, action);
  }
  if (map[action.type]) {
    return map[action.type](state, action);
  }
  return state;
};

export default createReducer;
