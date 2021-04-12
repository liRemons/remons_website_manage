import { service } from "@axios";
const getMusicList = () => {
  return service({
    method: "get",
    url: "/api/sone/queryList",
  });
};
export default { getMusicList };
