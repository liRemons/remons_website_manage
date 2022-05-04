import * as type from './type';

const defaultState = {
  userList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type['USER_LIST']:
      newState.userList = data;
      break;
    default:
      break;
  }

  return newState;
};
