import { service } from "@axios";
// 添加文章
const addArticle = ({ title, content, techClassId }) => {
  return service({
    method: "post",
    url: "/content/addArticle",
    data: {
      title,
      content,
      techClassId,
    },
  });
};
// 查询技术分类
const getTechClassList = ({ name }) => {
  return service({
    method: "get",
    url: "/content/queryTechClassList",
    params: {
      name,
    },
  });
};
// 新增技术分类
const addTechClass = ({ name, icon }) => {
  return service({
    method: "post",
    url: "/content/addTechClass",
    data: {
      name,
      icon,
    },
  });
};
// 更新技术分类
const updateTechClass = (data) => {
  return service({
    method: "put",
    url: "/content/updateTechClass",
    data,
  });
};
// 删除技术分类
const delTechClass = ({ ids }) => {
  return service({
    method: "delete",
    url: "/content/delTechClass",
    data: { ids },
  });
};

// 查询文章列表
const getArticleList = ({ title, techClassId }) => {
  return service({
    method: "get",
    url: "/content/queryArticleList",
    params: {
      title,
      techClassId,
    },
  });
};
// 更新文章
const updateArticle = ({ title, id, content, techClassId }) => {
  return service({
    method: "put",
    url: "/content/updateArticle",
    data: {
      title,
      id,
      content,
      techClassId,
    },
  });
};
// 删除文章
const delArticle = ({ ids }) => {
  return service({
    method: "delete",
    url: "/content/delArticle",
    data: {
      ids,
    },
  });
};
export default {
  addArticle,
  getTechClassList,
  addTechClass,
  updateTechClass,
  delTechClass,
  getArticleList,
  updateArticle,
  delArticle,
};
