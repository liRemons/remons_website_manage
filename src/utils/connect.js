import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// 此处做了封装，attr, actionCreators 接受数组或者单个，数组的情况是如果需要多个reduce 中的方法或数据，则传入数组
export default ({ attr, actionCreators }) => (components) => {
  const mapStateToProps = (state, ownProps) => {
    if (attr instanceof Array) {
      let obj = {};
      attr.forEach((item) => {
        obj = { ...obj, ...state[item] };
      });
      return obj;
    } else {
      return state[attr];
    }
  };
  const mapDispatchToProps = (dispatch, ownProps) => {
    if (actionCreators instanceof Array) {
      let obj = {};
      actionCreators.forEach((item) => {
        obj = { ...obj, ...bindActionCreators(item, dispatch) };
      });
      return obj;
    } else {
      return bindActionCreators(actionCreators, dispatch);
    }
  };
  // 还是原来一样的 connect
  return connect(mapStateToProps, mapDispatchToProps)(components);
};
