import { COMMENT, POST } from "constants/entities";
import { postListSchema, commentListSchema } from "schemas";

import createRequestAction from "./helpers/createRequestAction";

export const fetchPosts = createRequestAction(
  "FETCH_POSTS",
  async ({ apiFetch }) => await apiFetch("post/"),
  () => [[POST, "all"]],
  { schema: postListSchema },
);

export const fetchCommentsByPost = createRequestAction(
  "FETCH_COMMENTS_BY_POST",
  async ({ apiFetch }, postId) => await apiFetch(`comment/?post=${postId}`),
  () => [[COMMENT, "all"]],
  { schema: commentListSchema, finishMetaCreator: (_, postId) => ({ postId }) },
);
