import _ from "lodash";

import createReducer from "modules/helpers/createReducer";
import { fetchCommentsByPost } from "modules/request/actions";

export const selectors = {
  getByPost: (state, postId) => _.get(state, ["byPost", postId], []),
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
  },
  { byPost: {} },
);
