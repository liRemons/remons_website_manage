import * as type from "./type";

const defaultState = {
  musicList: [],
  singerList: [],
};

export default (state = defaultState, action = {}) => {
  const newState = { ...state };
  const { data } = action;
  switch (action.type) {
    case type["MUSIC_LIST"]:
      newState.musicList = data;
      break;
    case type["SINGER_LIST"]:
      newState.singerList = data;
      break;
    default:
      break;
  }
  return newState;
};
