import axios from 'axios';
import ReactDOM from 'react-dom';
import qs from 'qs';
import { message, Spin } from 'antd';
import { HOST_URL } from '@config';
const noLoadingURL = [];
const controlLoading = ({ isOpen }) => {
  const loadingDOM = document.getElementById('loading');
  if (isOpen) {
    loadingDOM.setAttribute('class', 'loadingVerlay');
    loadingDOM.style.display = 'flex';
    ReactDOM.render(<Spin tip='加载中...' size='large'></Spin>, loadingDOM);
  } else {
    loadingDOM.setAttribute('class', '');
    loadingDOM.style.display = 'none';
    ReactDOM.render('', loadingDOM);
  }
};
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : HOST_URL,
  // HOST_URL,
  timeout: 20000, //请求超时的时间
});
const arr = [service];
let loadingCount = 0;
arr.forEach((item) => {
  loadingCount = 0; // 接口请求累加
  item.interceptors.request.use(
    (config) => {
      const REMONS_TOKEN = localStorage.getItem('REMONS_TOKEN');
      REMONS_TOKEN && (config.headers['REMONS_TOKEN'] = REMONS_TOKEN);
      // 如果需要序列化
      if (
        config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ) {
        //post请求序列化
        config.data = qs.stringify(config.data);
      }

      // 全局loading
      if (!noLoadingURL.includes(config.url)) {
        loadingCount++;
        controlLoading({ isOpen: true });
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // response 拦截器,数据返回后进行一些处理
  item.interceptors.response.use(
    (response) => {
      loadingCount--;
      // --是为了让loading消失，因为上面++，所以待成功后让其抵消为0；（下同）
      if (loadingCount <= 0) {
        controlLoading({ isOpen: false });
        // 如果接口请求累加值小于0 那么关闭loading
      }
      const res = response.data || {};
      if (!res.success) {
        message.error(res.message || res.msg);
        if (res.code === 401) {
          window.location.href = `/manage/login?form=${window.location.href}`;
        }

        return {};
      }
      // 返回请求值
      return res || {};
    },
    (error) => {
      // 如果接口出错，当然，也可以根据错误的状态码进行错误信息配置，
      // 因为接口中没有返回特定状态码，所以没有配置
      loadingCount--;
      if (loadingCount <= 0) {
        controlLoading({ isOpen: false });
      }
      message.error(error.message);
      Promise.reject(error);
    }
  );
});
// request拦截器,在请求之前做一些处理

export { service };
