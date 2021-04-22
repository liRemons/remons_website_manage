import * as type from './type'


const defaultState = {

}

export default (state = defaultState, action ={} ) => {
  const newState = { ...state };
  const { data ,type} = action
  switch (action.type) {
    case '':
      
      break;
  
    default:
      break;
  }

  return newState
}