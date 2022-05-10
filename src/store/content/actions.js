import * as type from './type';
import { content, user } from '@api';
const {
  addArticle,
  getTechClassList,
  addTechClass,
  updateTechClass,
  delTechClass,
  getArticleList,
  updateArticle,
  delArticle,
} = content;

const { queryUser } = user;
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

  // 获取技术文章列表
  getArticleList: (payload) => async (dispatch) => {
    const res = await getArticleList(payload);
    const action = {
      type: type.TECT_ARTICLE_LIST,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
  // 更新技术文章
  updateArticle: (payload) => async () => {
    const res = await updateArticle(payload);
    return res;
  },
  // 删除技术文章
  delArticle: (payload) => async () => {
    const res = await delArticle(payload);
    return res;
  },

  // 获取用户列表
  getUser: (payload) => async (dispatch) => {
    const res = await queryUser(payload);
    const action = {
      type: type.USER,
      payload,
      data: res.data,
    };
    dispatch(action);
  },
};

export default action;
