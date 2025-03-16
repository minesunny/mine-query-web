import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // 设置基本的请求路径
  timeout: 5000, // 请求超时时间（单位：毫秒）
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (_error) => {
    return Promise.reject("message");
  },
);

export default instance;
