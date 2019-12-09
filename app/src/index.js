import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";

import { fetchPosts, fetchCommentsByPost } from "modules/request/actions";
import store from "store";

const App = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

const mapState = state => ({
  postsAreFetching: fetchPosts.getStatus(state).isFetching,
  postsAreBlocked: fetchPosts.getIsBlocked(state),
});

const ConnectedApp = connect(mapState)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root"),
);

store.dispatch(fetchPosts());
store.dispatch(fetchPosts());
store.dispatch(fetchPosts());
store.dispatch(fetchCommentsByPost(1));
store.dispatch(fetchCommentsByPost(2));
store.dispatch(fetchCommentsByPost(3));
