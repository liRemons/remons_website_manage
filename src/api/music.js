import { service } from "@axios";
// 获取歌曲列表
const getMusicList = ({ page, name }) => {
  return service({
    method: "get",
    url: "/song/queryList",
    params: {
      page,
      name,
    },
  });
};
// 添加歌手
const addSinger = ({ name, photo }) => {
  return service({
    method: "post",
    url: "/song/addSinger",
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
    url: "/song/updateSinger",
    data,
  });
};
// 获取歌手列表
const getSingerList = ({ name }) => {
  return service({
    method: "get",
    url: "/song/querySingerList",
    params: {
      name,
    },
  });
};
// 删除歌手
const delSinger = ({ ids }) => {
  return service({
    method: "delete",
    url: "/song/delSinger",
    data: { ids },
  });
};
export default {
  getMusicList,
  addSinger,
  updateSinger,
  getSingerList,
  delSinger,
};
