import { combineReducers } from 'redux';
import utils from './utils/reducer';
import home from './home/reducer';
import music from './music/reducer';
import content from './content/reducer';
import doc from './doc/reducer';
import info from './info/reducer';
import user from './user/reducer';

// 合并 reducer
const reducer = combineReducers({
  utils,
  home,
  music,
  content,
  doc,
  info,
  user
});

export default reducer;
