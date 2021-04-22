import { combineReducers } from "redux";
import utils from "./utils/reducer";
import home from "./home/reducer";
import music from "./music/reducer";
import content from "./content/reducer";
// 合并 reducer
const reducer = combineReducers({
  utils,
  home,
  music,
  content,
});

export default reducer;
