import * as type from "./type";

const defaultState = {
  techClassList: [],
  techArticleList: [],
  userList: []
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type["TECH_CLASS_LIST"]:
      newState.techClassList = data;
      break;
    case type["TECT_ARTICLE_LIST"]:
      newState.techArticleList = data;
      break;
      case type["USER"]:
        newState.userList = data;
        break;
    default:
      break;
  }

  return newState;
};
