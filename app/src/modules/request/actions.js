import { COMMENT, POST } from "constants/entities";
import { postSchema, postListSchema, commentListSchema } from "schemas";

import createRequestAction from "./helpers/createRequestAction";

export const fetchPosts = createRequestAction(
  "FETCH_POSTS",
  async ({ getState, apiFetch }) => {
    const ordering = getState().post.ordering;
    return await apiFetch(`post/?ordering=${ordering}`);
  },
  () => [[POST, "all"]],
  { schema: postListSchema },
);

export const createPost = createRequestAction(
  "CREATE_POST",
  async ({ apiFetch }, post) =>
    await apiFetch("post/", {
      method: "POST",
      body: post,
    }),
  () => [[POST, "create"]],
  { schema: postSchema },
);

export const fetchCommentsByPost = createRequestAction(
  "FETCH_COMMENTS_BY_POST",
  async ({ apiFetch }, postId) => await apiFetch(`comment/?post=${postId}`),
  () => [[COMMENT, "all"]],
  { schema: commentListSchema, finishMetaCreator: (_, postId) => ({ postId }) },
);
