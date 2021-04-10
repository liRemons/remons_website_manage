import { combineReducers } from "redux";
import utils from "./utils/reducer";
import Home from "./Home/reducer";
// 合并 reducer
const reducer = combineReducers({
  utils,
  Home,
});

export default reducer;
