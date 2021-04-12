import { service } from "@axios";
const getMusicList = () => {
  return service({
    method: "get",
    url: "/api/song/queryList",
  });
};
export default { getMusicList };
