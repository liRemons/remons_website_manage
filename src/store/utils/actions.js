import * as type from "./type";
const action = {
  setScroll: (payload) => (dispatch) => {
    // 示例，存储滚动条距离 payload: { key:value }
    const data = {
      type: type.SET_SCROLL,
      payload,
    };
    dispatch(data);
  },
};

export default action;
