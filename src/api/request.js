import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    // const token = uni.getStorageSync('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // 处理未授权
        uni.showToast({
          title: '请重新登录',
          icon: 'none'
        });
      } else {
        uni.showToast({
          title: data.message || '请求失败',
          icon: 'none'
        });
      }
    } else {
      uni.showToast({
        title: '网络错误',
        icon: 'none'
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
