import * as type from "./type";
import { content } from "@api";
const { addArticle } = content;
const action = {
  addArticle: (payload) => async () => {
    const res = await addArticle(payload);
    return res;
  },
};

export default action;
