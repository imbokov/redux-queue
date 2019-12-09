import _ from "lodash";

const applyBlockers = (blockers, paths, value) =>
  _.merge({}, blockers, ...paths.map(path => _.set({}, path, value)));

export default applyBlockers;
