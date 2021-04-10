import * as type from './type'
const defaultState = {
  scroll:{}
}

export default ( state = defaultState, action = {} )=> {
  const newState = { ...state }
  switch (action.type) {
    case type.SET_SCROLL:
      
      break;
  
    default:
      break;
  }
  return newState
}