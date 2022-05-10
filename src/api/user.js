import { service } from '@axios';
// 添加用户
const addUser = ({ account, password, photo, name }) => {
  return service({
    method: 'post',
    url: '/user/addUser',
    data: {
      account,
      password,
      photo,
      name
    },
  });
};
// 查询用户
const queryUser = ({ name, account }) => {
  return service({
    method: 'get',
    url: '/user/queryUser',
    params: {
      name,
      account
    },
  });
};

const queryUserEumn = () => {
  return service({
    method: 'get',
    url: '/user/queryUserEumn',
    params: {},
  });
}
// 更新技术分类
const updateUser = (data) => {
  return service({
    method: 'put',
    url: '/user/updateUser',
    data,
  });
};
// 删除技术分类
const deleteUser = ({ ids }) => {
  return service({
    method: 'delete',
    url: '/user/deleteUser',
    data: { ids },
  });
};

export default {
  addUser,
  updateUser,
  queryUser,
  deleteUser,
  queryUserEumn
};
