import * as type from './type';
import { doc } from '@api';
const { addDoc, queryDocList, deleteDoc, updateDoc } = doc;
const action = {
  addDoc: (payload) => async () => {
    const res = await addDoc(payload);
    return res;
  },
  queryDocList: (payload) => async (dispatch) => {
    const res = await queryDocList(payload);
    const action = {
      type: type.DOC_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  updateDoc: (payload) => async () => {
    const res = await updateDoc(payload);
    return res;
  },
  deleteDoc: (payload) => async () => {
    const res = await deleteDoc(payload);
    return res;
  },
};

export default action;
