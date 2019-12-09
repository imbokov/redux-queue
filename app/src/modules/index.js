import { combineReducers } from "redux";

import comment from "./comment";
import entities from "./entities";
import post from "./post";
import request from "./request";

export default combineReducers({
  comment,
  entities,
  post,
  request,
});
