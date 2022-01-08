import * as type from './type';

const defaultState = {
  docList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type['DOC_LIST']:
      newState.docList = data;
      break;
    default:
      break;
  }

  return newState;
};
