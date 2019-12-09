import React from "react";
import { connect } from "react-redux";

import { selectors as postSelectors } from "modules/post";

import PostItem from "./PostItem";

const PostList = ({ postIds }) => (
  <ul>
    {postIds.map(postId => (
      <PostItem key={postId} postId={postId} />
    ))}
  </ul>
);

const mapState = state => ({
  postIds: postSelectors.getIds(state),
});

export default connect(mapState)(PostList);
