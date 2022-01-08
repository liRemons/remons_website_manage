import * as type from './type';
import { info } from '@api';
const { addMyInfo, updateMyInfo, queryMyInfo, deleteMyInfo } = info;
const action = {
  addMyInfo: (payload) => async () => {
    const res = await addMyInfo(payload);
    return res;
  },
  queryMyInfo: (payload) => async (dispatch) => {
    const res = await queryMyInfo(payload);
    const action = {
      type: type.INFO_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  updateMyInfo: (payload) => async () => {
    const res = await updateMyInfo(payload);
    return res;
  },
  deleteMyInfo: (payload) => async () => {
    const res = await deleteMyInfo(payload);
    return res;
  },
};

export default action;
