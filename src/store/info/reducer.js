import * as type from './type';

const defaultState = {
  infoList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type['INFO_LIST']:
      newState.infoList = data;
      break;
    default:
      break;
  }

  return newState;
};
