import { service } from "@axios";
// 添加文章
const addArticle = (data) => {
  return service({
    method: "post",
    url: "/content/addArticle",
    data,
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
const addTechClass = (data) => {
  return service({
    method: "post",
    url: "/content/addTechClass",
    data,
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

// 查询文章详情
const getArticleDetail = ({ id }) => {
  return service({
    method: "get",
    url: "/content/getArticleDetail",
    params: {
      id
    },
  });
};
// 更新文章
const updateArticle = (data) => {
  return service({
    method: "put",
    url: "/content/updateArticle",
    data
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


const downloadMarkdown = () => {
  return service({
    method: "get",
    url: "/content/downloadMarkdown"
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
  getArticleDetail,
  downloadMarkdown
};
