import * as type from "./type";
import { music } from "@api";
const { getMusicList } = music;
const action = {
  getMusicList: (payload) => async (dispatch) => {
    const data = await getMusicList();
    const action = {
      type: type.MUSIC_LIST,
      payload,
      data
    };
    dispatch(action);
  },
};

export default action;
