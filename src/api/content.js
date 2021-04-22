import { service } from "@axios";

const addArticle = ({ content }) => {
  return service({
    method: "post",
    url: "/content/addArticle",
    data: {
      content,
    },
  });
};

export default {
  addArticle,
};
