import React from "react";
import { connect } from "react-redux";

import { selectors as commentSelectors } from "modules/comment";

import CommentItem from "./CommentItem";

const CommentList = ({ commentsIds }) => (
  <ul>
    {commentsIds.map(commentId => (
      <CommentItem key={commentId} commentId={commentId} />
    ))}
  </ul>
);

const mapState = (state, { postId }) => ({
  commentsIds: commentSelectors.getByPost(state, postId),
});

export default connect(mapState)(CommentList);
