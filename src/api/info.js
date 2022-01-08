import { service } from '@axios';
// 添加文章
const addMyInfo = ({ keyName, val, url, description }) => {
  console.log({ description });
  return service({
    method: 'post',
    url: '/info/addMyInfo',
    data: {
      keyName,
      val,
      url,
      description,
    },
  });
};
// 查询技术分类
const queryMyInfo = ({ keyName }) => {
  return service({
    method: 'get',
    url: '/info/queryMyInfo',
    params: {
      keyName,
    },
  });
};
// 更新技术分类
const updateMyInfo = (data) => {
  return service({
    method: 'put',
    url: '/info/updateMyInfo',
    data,
  });
};
// 删除技术分类
const deleteMyInfo = ({ ids }) => {
  return service({
    method: 'delete',
    url: '/info/deleteMyInfo',
    data: { ids },
  });
};

export default {
  addMyInfo,
  updateMyInfo,
  queryMyInfo,
  deleteMyInfo,
};
