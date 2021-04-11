import { combineReducers } from "redux";
import utils from "./utils/reducer";
import home from "./home/reducer";
import music from "./music/reducer";
// 合并 reducer
const reducer = combineReducers({
  utils,
  home,
  music,
});

export default reducer;
