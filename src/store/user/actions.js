import * as type from './type';
import { user, login } from '@api';
const { userLogin } = login;
const { addUser, updateUser, queryUser, deleteUser } = user;
const action = {
  addUser: (payload) => async () => {
    const res = await addUser(payload);
    return res;
  },
  userLogin: (payload) => async () => {
    const res = await userLogin(payload);
    return res;
  },
  queryUser: (payload) => async (dispatch) => {
    const res = await queryUser(payload);
    const action = {
      type: type.USER_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  updateUser: (payload) => async () => {
    const res = await updateUser(payload);
    return res;
  },
  deleteUser: (payload) => async () => {
    const res = await deleteUser(payload);
    return res;
  },
};

export default action;
