import { service } from '@axios';
// 添加文章
const userLogin = ({ account, password }) => {
  return service({
    method: 'post',
    url: '/user/login',
    data: {
      account,
      password,
    },
  });
};

export default {
  userLogin
};
