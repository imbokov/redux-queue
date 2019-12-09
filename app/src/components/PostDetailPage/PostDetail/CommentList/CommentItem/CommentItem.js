import React from "react";
import { connect } from "react-redux";

import { COMMENT } from "constants/entities";
import { selectors as entitiesSelectors } from "modules/entities";

const CommentItem = ({ comment }) => (
  <li>
    <p>{comment.body}</p>
  </li>
);

const mapState = (state, { commentId }) => ({
  comment: entitiesSelectors.getEntity(state, COMMENT, commentId),
});

export default connect(mapState)(CommentItem);
