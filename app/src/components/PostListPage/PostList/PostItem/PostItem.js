import React from "react";
import { connect } from "react-redux";

import { POST } from "constants/entities";
import { selectors as entitiesSelectors } from "modules/entities";

const PostItem = ({ post }) => (
  <li>
    <p>{post.title}</p>
    <p>{post.body}</p>
  </li>
);

const mapState = (state, { postId }) => ({
  post: entitiesSelectors.getEntity(state, POST, postId),
});

export default connect(mapState)(PostItem);
