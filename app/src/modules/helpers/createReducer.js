import { FINISH_REQUEST } from "constants/actionTypes";

const createReducer = (map, initialState) => (state = initialState, action) => {
  if (action.type === FINISH_REQUEST && map[action.meta.id]) {
    const requestHandler = map[action.meta.id];
    if (!action.payload.error) {
      if (typeof requestHandler === "function") {
        return requestHandler(state, action);
      }
      if (requestHandler.success) {
        return requestHandler.success(state, action);
      }
    } else if (requestHandler.error) {
      return requestHandler.error(state, action);
    }
  }
  if (map[action.type]) {
    return map[action.type](state, action);
  }
  return state;
};

export default createReducer;
