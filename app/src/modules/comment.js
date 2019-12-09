import _ from "lodash";

import createReducer from "modules/helpers/createReducer";
import { createComment, fetchCommentsByPost } from "modules/request/actions";

export const selectors = {
  getByPost: (state, postId) => _.get(state, ["comment", "byPost", postId], []),
};

export default createReducer(
  {
    [fetchCommentsByPost]: (state, { payload, meta }) => ({
      ...state,
      byPost: {
        ...state.byPost,
        [meta.postId]: payload.result,
      },
    }),
    [createComment]: (state, { payload, meta }) => ({
      ...state,
      byPost: {
        ...state.byPost,
        [meta.postId]: [payload.result, ...state.byPost[meta.postId]],
      },
    }),
  },
  { byPost: {} },
);
