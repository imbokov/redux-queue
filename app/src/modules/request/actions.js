import { COMMENT, POST } from "constants/entities";
import { postListSchema, commentListSchema } from "schemas";

import createRequestAction from "./helpers/createRequestAction";

export const fetchPosts = createRequestAction(
  "FETCH_POSTS",
  async ({ apiFetch }) => await apiFetch("https://jsonplaceholder.typicode.com/posts"),
  () => [[POST, "all"]],
  { schema: postListSchema },
);

export const fetchCommentsByPost = createRequestAction(
  "FETCH_COMMENTS_BY_POST",
  async ({ apiFetch }, postId) =>
    await apiFetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
  () => [[COMMENT, "all"]],
  { schema: commentListSchema, finishMetaCreator: (_, postId) => ({ postId }) },
);
