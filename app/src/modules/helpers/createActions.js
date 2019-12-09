const createActions = (...types) =>
  types.map(type => {
    const action = (payload, meta) => ({
      type,
      payload,
      meta,
    });
    action.toString = () => type;
    return action;
  });

export default createActions;
