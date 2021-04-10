import api from "@axios";
const { service } = api;
export default {
  getTest: () =>
    service({
      method: "post",
      url: "/api/test",
    }),
};
