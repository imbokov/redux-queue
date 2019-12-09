import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { selectors as postSelectors } from "modules/post";
import { fetchPosts } from "modules/request/actions";

import CreatePost from "./CreatePost";
import Ordering from "./Ordering";
import PostList from "./PostList";

class PostListPage extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { postIds, isFetching } = this.props;

    return (
      <Fragment>
        <CreatePost />
        <Ordering />
        {postIds.length === 0 && isFetching && <p>Loading posts</p>}
        {postIds.length === 0 && !isFetching && <p>No posts present</p>}
        {postIds.length !== 0 && (
          <Fragment>
            <PostList />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapState = state => ({
  postIds: postSelectors.getIds(state),
  isFetching: fetchPosts.getStatus(state).isFetching,
});

const mapDispatch = {
  fetchPosts,
};

export default connect(mapState, mapDispatch)(PostListPage);
