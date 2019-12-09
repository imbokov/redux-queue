import _ from "lodash";

const lineIsClear = (blockers, paths) =>
  paths.every(path => {
    const [sliceKey, key] = _.toPath(path);
    const slice = blockers[sliceKey];
    if (!slice) return true;
    if (key === "all") {
      return Object.values(slice).every(blocker => blocker === false);
    }
    return slice.all !== true && slice[key] !== true;
  });

export default lineIsClear;
