import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { POST } from "constants/entities";
import { selectors as entitiesSelectors } from "modules/entities";
import { fetchPost, fetchCommentsByPost } from "modules/request/actions";

import PostDetail from "./PostDetail";

class PostDetailPage extends Component {
  async componentDidMount() {
    const {
      match: {
        params: { postId },
      },
      history,
      fetchPost,
      fetchCommentsByPost,
    } = this.props;

    try {
      await Promise.all([fetchPost(postId, { rethrowError: true }), fetchCommentsByPost(postId)]);
    } catch (e) {
      if (e.status === 404) {
        history.push("/not-found");
      }
    }
  }

  render() {
    const {
      post,
      isFetching,
      match: {
        params: { postId },
      },
    } = this.props;

    const postIsFetched = post.title && post.body;

    return (
      <Fragment>
        {!postIsFetched && isFetching && <p>Loading post</p>}
        {!postIsFetched && !isFetching && <p>No post present</p>}
        {postIsFetched && <PostDetail postId={postId} />}
      </Fragment>
    );
  }
}

const mapState = (
  state,
  {
    match: {
      params: { postId },
    },
  },
) => ({
  post: entitiesSelectors.getEntity(state, POST, postId),
  isFetching: fetchPost.getStatus(state, postId).isFetching,
});

const mapDispatch = {
  fetchPost,
  fetchCommentsByPost,
};

export default connect(mapState, mapDispatch)(PostDetailPage);
