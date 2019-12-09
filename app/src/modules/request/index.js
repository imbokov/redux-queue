import { combineReducers } from "redux";

import blockers from "./reducers/blockers";
import queue from "./reducers/queue";
import statuses from "./reducers/statuses";

export default combineReducers({
  blockers,
  queue,
  statuses,
});
