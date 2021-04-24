import { service } from "@axios";
// 添加文章
const addArticle = ({ content }) => {
  return service({
    method: "post",
    url: "/content/addArticle",
    data: {
      content,
    },
  });
};
// 查询技术分类
const getTechClassList = ({ name }) => {
  return service({
    method: "get",
    url: "/content/queryTechClassList",
    data: {
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
export default {
  addArticle,
  getTechClassList,
  addTechClass,
  updateTechClass,
  delTechClass,
};
