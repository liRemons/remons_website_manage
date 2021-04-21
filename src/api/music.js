import { service } from "@axios";

// 添加歌手
const addSinger = ({ name, photo }) => {
  return service({
    method: "post",
    url: "/music/addSinger",
    data: {
      name,
      photo,
    },
  });
};
// 修改歌手
const updateSinger = (data) => {
  return service({
    method: "put",
    url: "/music/updateSinger",
    data,
  });
};
// 获取歌手列表
const getSingerList = ({ name }) => {
  return service({
    method: "get",
    url: "/music/querySingerList",
    params: {
      name,
    },
  });
};
// 删除歌手
const delSinger = ({ ids }) => {
  return service({
    method: "delete",
    url: "/music/delSinger",
    data: { ids },
  });
};

// 获取专辑
const getCollectionList = ({ name }) => {
  return service({
    method: "get",
    url: "/music/queryCollectionList",
    params: {
      name,
    },
  });
};
// 新增专辑
const addCollection = ({ name }) => {
  return service({
    method: "post",
    url: "/music/addCollection",
    data: {
      name,
    },
  });
};
// 更新专辑
const updateCollection = (data) => {
  return service({
    method: "put",
    url: "/music/updateCollection",
    data,
  });
};
// 删除专辑
const delCollection = ({ ids }) => {
  return service({
    method: "delete",
    url: "/music/delCollection",
    data: { ids },
  });
};

// 获取歌曲列表
const getMusicList = ({ page, name }) => {
  return service({
    method: "get",
    url: "/music/querySongList",
    params: {
      page,
      name,
    },
  });
};
// 添加歌曲
const addSong = ({ name, url, authorId, collectionId }) => {
  return service({
    method: "post",
    url: "/music/addSong",
    data: {
      name,
      url,
      authorId,
      collectionId,
    },
  });
};
// 删除歌曲
const delSong = ({ ids }) => {
  return service({
    method: "delete",
    url: "/music/delSong",
    data: { ids },
  });
};
// 更新歌曲
const updateSong = (data) => {
  return service({
    method: "put",
    url: "/music/updateSong",
    data,
  });
}
export default {
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
};
