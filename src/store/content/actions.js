import * as type from "./type";
import { content } from "@api";
const {
  addArticle,
  getTechClassList,
  addTechClass,
  updateTechClass,
  delTechClass,
} = content;
const action = {
  // 新增文章
  addArticle: (payload) => async () => {
    const res = await addArticle(payload);
    return res;
  },
  // 获取技术分类
  getTechClassList: (payload) => async (dispatch) => {
    const res = await getTechClassList(payload);
    const action = {
      type: type.TECH_CLASS_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  // 新增技术分类
  addTechClass: (payload) => async () => {
    const res = await addTechClass(payload);
    return res;
  },
  // 更新技术分类
  updateTechClass: (payload) => async () => {
    const res = await updateTechClass(payload);
    return res;
  },
  // 删除技术分类
  delTechClass: (payload) => async () => {
    const res = await delTechClass(payload);
    return res;
  },
};

export default action;
