import React from "react";
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";

import PostDetailPage from "components/PostDetailPage";
import PostListPage from "components/PostListPage";

const links = [
  {
    to: "/",
    display: "Home",
    exact: true,
  },
  {
    to: "/post",
    display: "Posts",
  },
];

const App = () => (
  <Router>
    <nav>
      {links.map(({ display, ...linkProps }) => (
        <NavLink key={linkProps.to} {...linkProps}>
          {display}
        </NavLink>
      ))}
    </nav>
    <Switch>
      <Route path="/" exact>
        <div>This is a home page</div>
      </Route>
      <Route path="/post" exact>
        <PostListPage />
      </Route>
      <Route path="/post/:postId" component={PostDetailPage} />
      <Route path="/not-found">
        <div>Not found</div>
      </Route>
      <Redirect to="/not-found" />
    </Switch>
  </Router>
);

export default App;
