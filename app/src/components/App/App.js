import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

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
        <div>This is a post list page</div>
      </Route>
      <Route path="/post/:postId">
        <div>This is a post detail page</div>
      </Route>
      <Route>
        <div>Not found</div>
      </Route>
    </Switch>
  </Router>
);

export default App;
