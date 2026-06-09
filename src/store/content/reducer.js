import * as type from './type';

const defaultState = {
  techClassList: [],
  techArticleList: [],
  techArticleTotal: 0,
  techArticlePage: 1,
  techArticlePageSize: 10,
  techArticleDetail: {},
  userList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type['TECH_CLASS_LIST']:
      newState.techClassList = data;
      break;
    case type['TECT_ARTICLE_LIST']:
      newState.techArticleList = data;
      newState.techArticleTotal = action.total || 0;
      newState.techArticlePage = action.page || 1;
      newState.techArticlePageSize = action.pageSize || 10;
      break;
    case type['TECT_ARTICLE_DETAIL']:
      newState.techArticleDetail = data;
      break;
    case type['USER']:
      newState.userList = data;
      break;
    default:
      break;
  }

  return newState;
};
