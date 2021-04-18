import * as type from "./type";
import { music } from "@api";
const {
  getMusicList,
  addSinger,
  updateSinger,
  getSingerList,
  delSinger,
} = music;
const action = {
  // 获取歌曲列表
  getMusicList: (payload) => async (dispatch) => {
    const res = await getMusicList(payload);
    const action = {
      type: type.MUSIC_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  // 添加歌手
  addSinger: (payload) => async (dispatch) => {
    const res = await addSinger(payload);
    return res;
  },
  // 修改歌手
  updateSinger: (payload) => async (dispatch) => {
    const res = await updateSinger(payload);
    return res;
  },
  // 获取歌手列表
  getSingerList: (payload) => async (dispatch) => {
    const res = await getSingerList(payload);
    const action = {
      type: type.SINGER_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  // 删除歌手
  delSinger: (payload) => async () => {
    const res = await delSinger(payload);
    return res;
  },
};

export default action;
