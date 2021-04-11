import { service } from "@axios";
const getMusicList = () => {
  return service({
    method: "get",
    url: "/api/music/getMusicList",
  });
};
export default { getMusicList };
