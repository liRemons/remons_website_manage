import * as type from './type'

const defaultState = {
  musicList:[]
}


export default ( state = defaultState, action = {} )=> {
  const newState = { ...state };
  const { data } = action;
  switch (type.MUSIC_LIST) {
    case action.type:
      newState.musicList = data;
      break;
  
    default:
      break;
  }
  return newState
}