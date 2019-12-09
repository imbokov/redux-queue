import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { POST } from "constants/entities";
import { selectors as entitiesSelectors } from "modules/entities";
import { deletePost } from "modules/request/actions";

const PostItem = ({ post, isBlocked, status: { isFetching, error }, deletePost }) => {
  let buttonText;
  if (isFetching) {
    buttonText = "Deleting";
  } else if (isBlocked) {
    buttonText = "Blocked";
  } else {
    buttonText = "Delete";
  }

  return (
    <li>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
      <button type="button" onClick={deletePost}>
        {buttonText}
      </button>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </li>
  );
};

const mapState = (state, { postId }) => ({
  post: entitiesSelectors.getEntity(state, POST, postId),
  isBlocked: deletePost.getIsBlocked(state, postId).isFetching,
  status: deletePost.getStatus(state, postId),
});

const mapDispatch = (dispatch, { postId }) => ({
  deletePost: () => dispatch(deletePost(postId)),
});

export default connect(mapState, mapDispatch)(PostItem);
