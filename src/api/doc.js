import { service } from '@axios';
// 添加文章
const addDoc = ({ title, url }) => {
  return service({
    method: 'post',
    url: '/doc/addDoc',
    data: {
      title,
      url,
    },
  });
};
// 查询技术分类
const queryDocList = ({ title }) => {
  return service({
    method: 'get',
    url: '/doc/queryDocList',
    params: {
      title,
    },
  });
};
// 更新技术分类
const updateDoc = (data) => {
  return service({
    method: 'put',
    url: '/doc/updateDoc',
    data,
  });
};
// 删除技术分类
const deleteDoc = ({ ids }) => {
  return service({
    method: 'delete',
    url: '/doc/deleteDoc',
    data: { ids },
  });
};

export default {
  addDoc,
  queryDocList,
  deleteDoc,
  updateDoc,
};
