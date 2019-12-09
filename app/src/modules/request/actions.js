import { COMMENT, POST } from "constants/entities";
import { postSchema, postListSchema, commentSchema, commentListSchema } from "schemas";

import createRequestAction from "./helpers/createRequestAction";

export const fetchPost = createRequestAction(
  "FETCH_POST",
  async ({ apiFetch }, postId) => await apiFetch(`post/${postId}/`),
  postId => [[POST, `id${postId}`]],
  { schema: postSchema },
);

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

export const deletePost = createRequestAction(
  "DELETE_POST",
  async ({ apiFetch }, postId) =>
    await apiFetch(`post/${postId}/`, {
      method: "DELETE",
    }),
  postId => [[POST, `id${postId}`]],
  { finishMetaCreator: (_, postId) => ({ deletedEntity: POST, deletedId: postId }) },
);

export const createComment = createRequestAction(
  "CREATE_COMMENT",
  async ({ apiFetch }, comment) =>
    await apiFetch("comment/", {
      method: "POST",
      body: comment,
    }),
  // TODO: Actually creating multiple comments simultaneously won't result in a race condition,
  // but for now it's impossible to track the request results for each concurrent request.
  // Will need to implement optimistic updates.
  () => [[COMMENT, "create"]],
  { schema: commentSchema, finishMetaCreator: (_, { post }) => ({ postId: post }) },
);

export const fetchCommentsByPost = createRequestAction(
  "FETCH_COMMENTS_BY_POST",
  async ({ apiFetch }, postId) => await apiFetch(`comment/?post=${postId}&ordering=-id`),
  // TODO: We know for a fact, that it won't block the comments for the other posts,
  // So maybe will need some way to supply `getState` to `getBlockerPaths` and an `exclude` option.
  () => [[COMMENT, "all"]],
  { schema: commentListSchema, finishMetaCreator: (_, postId) => ({ postId }) },
);
