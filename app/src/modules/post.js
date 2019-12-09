import createActions from "modules/helpers/createActions";
import createReducer from "modules/helpers/createReducer";
import { deletePost, fetchPosts } from "modules/request/actions";

const [setOrdering] = createActions("SET_ORDERING");

export const actions = {
  setOrdering,
};

export const selectors = {
  getIds: state => state.post.ids,
  getOrdering: state => state.post.ordering,
};

export default createReducer(
  {
    [fetchPosts]: (state, { payload }) => ({
      ...state,
      ids: payload.result,
    }),
    [deletePost]: (state, { meta }) => ({
      ...state,
      ids: state.ids.filter(id => id !== meta.deletedId),
    }),
    [setOrdering]: (state, { payload }) => ({
      ...state,
      ordering: payload,
    }),
  },
  { ids: [], ordering: "-id" },
);
