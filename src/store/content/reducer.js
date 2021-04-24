import * as type from "./type";

const defaultState = {
  techClassList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type["TECH_CLASS_LIST"]:
      newState.techClassList = data;
      break;

    default:
      break;
  }

  return newState;
};
