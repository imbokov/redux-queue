import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { actions as postActions, selectors as postSelectors } from "modules/post";
import { fetchPosts } from "modules/request/actions";

const options = [
  {
    value: "-id",
    display: "Last created",
  },
  {
    value: "title",
    display: "Title",
  },
];

class Ordering extends Component {
  componentDidUpdate({ ordering: prevOrdering }) {
    const { ordering, fetchPosts } = this.props;
    if (prevOrdering !== ordering) {
      fetchPosts();
    }
  }

  handleChange = ({ target: { value } }) => this.props.setOrdering(value);

  render() {
    const { ordering, isBlocked, isFetching } = this.props;

    return (
      <Fragment>
        {isFetching && <p>Fetching the list</p>}
        {isBlocked && !isFetching && <p>Fetching is blocked</p>}
        <select value={ordering} onChange={this.handleChange}>
          {options.map(({ value, display }) => (
            <option key={value} value={value}>
              {display}
            </option>
          ))}
        </select>
      </Fragment>
    );
  }
}

const mapState = state => ({
  ordering: postSelectors.getOrdering(state),
  isBlocked: fetchPosts.getIsBlocked(state),
  isFetching: fetchPosts.getStatus(state).isFetching,
});

const mapDispatch = {
  setOrdering: postActions.setOrdering,
  fetchPosts,
};

export default connect(mapState, mapDispatch)(Ordering);
