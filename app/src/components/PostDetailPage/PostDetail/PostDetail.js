import React from "react";
import { connect } from "react-redux";

import { POST } from "constants/entities";
import { selectors as entitiesSelectors } from "modules/entities";
import { selectors as commentSelectors } from "modules/comment";
import { fetchCommentsByPost } from "modules/request/actions";

import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

const PostDetail = ({ post, commentIds, commentsAreFetching }) => (
  <div>
    <p>{post.title}</p>
    <p>{post.body}</p>
    <CreateComment postId={post.id} />
    {commentIds.length === 0 && commentsAreFetching && <p>Fetching comments</p>}
    {commentIds.length === 0 && !commentsAreFetching && <p>No comments are present</p>}
    {commentIds.length !== 0 && <CommentList postId={post.id} />}
  </div>
);

const mapState = (state, { postId }) => ({
  post: entitiesSelectors.getEntity(state, POST, postId),
  commentIds: commentSelectors.getByPost(state, postId),
  commentsAreFetching: fetchCommentsByPost.getStatus(state, postId).isFetching,
});

export default connect(mapState)(PostDetail);
