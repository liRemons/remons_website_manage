import * as type from "./type";

const defaultState = {
  techClassList: [],
  techArticleList: [],
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
    default:
      break;
  }

  return newState;
};
