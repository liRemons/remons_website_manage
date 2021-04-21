import * as type from "./type";
import { music } from "@api";
const {
  getMusicList,
  addSinger,
  updateSinger,
  getSingerList,
  delSinger,
  getCollectionList,
  addCollection,
  updateCollection,
  delCollection,
  addSong,
  delSong,
  updateSong
} = music;
const action = {
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

  // 查询专辑
  getCollectionList: (payload) => async (dispatch) => {
    const res = await getCollectionList(payload);
    const action = {
      type: type.COLLECTION_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  // 新增专辑
  addCollection: (payload) => async () => {
    const res = await addCollection(payload);
    return res;
  },
  // 更新专辑
  updateCollection: (payload) => async () => {
    const res = await updateCollection(payload);
    return res;
  },
  // 删除专辑
  delCollection: (payload) => async () => {
    const res = await delCollection(payload);
    return res;
  },

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
  // 新增歌曲
  addSong: (payload) => async () => {
    const res = await addSong(payload);
    return res;
  },
  // 删除歌曲
  delSong: (payload) => async () => {
    const res = await delSong(payload);
    return res;
  },
  // 更新歌曲
  updateSong:(payload) => async () => {
    const res = await updateSong(payload);
    return res;
  }
};

export default action;
