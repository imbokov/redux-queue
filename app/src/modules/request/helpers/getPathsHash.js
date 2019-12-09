import _ from "lodash";

const getPathsHash = paths => _.join(paths.map(path => _.join(_.toPath(path))));

export default getPathsHash;
