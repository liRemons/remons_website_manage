import * as type from "./type";
const defaultState = {
  test: "",
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case type.TEST:
      // 处理
      break;

    default:
      break;
  }
  return newState;
};
