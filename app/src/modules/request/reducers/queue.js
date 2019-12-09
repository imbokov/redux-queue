import { ADD_TO_QUEUE, FINISH_REQUEST } from "constants/actionTypes";

const initialState = [];

const reducer = (state = initialState, { type, payload }) => {
  if (type === ADD_TO_QUEUE) {
    return [...state, payload];
  }
  if (type === FINISH_REQUEST) {
    return state.filter(({ requestId }) => payload.requestId !== requestId);
  }
  return state;
};

export default reducer;
