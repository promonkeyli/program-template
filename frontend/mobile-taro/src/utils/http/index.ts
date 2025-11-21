import axios, { type AxiosInstance } from 'axios';
import Taro from '@tarojs/taro';
import useUserStore from '@/stores/user';
import type { BaseResponse } from './type';

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  // 读取 .env.development 或 .env.production 中的环境变量
  baseURL: process.env.TARO_APP_BASE_URL || 'http://localhost:3000',
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 不需要认证令牌的接口白名单
// 可以是完整的URL，也可以是相对于baseURL的路径
// 例如: ['/auth/login', '/auth/register']
const noAuthUrls: string[] = [
  // '/api/user/login', // 示例：登录接口不需要token
  // '/api/user/register', // 示例：注册接口不需要token
];

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 检查当前请求的URL是否在白名单中
    const isNoAuth = noAuthUrls.some(url => config.url?.includes(url));

    if (!isNoAuth) {
      // 从 Zustand store 获取 token
      const token = useUserStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res: BaseResponse = response.data;
    // 业务成功码，可根据后端实际情况修改
    const SUCCESS_CODE = 200;

    if (res.code === SUCCESS_CODE) {
      // 如果业务成功，直接返回 data 部分
      return res.data;
    }

    // 如果业务失败，显示提示并拒绝 Promise
    Taro.showToast({
      title: res.message || '业务处理失败',
      icon: 'none',
      duration: 2000,
    });
    return Promise.reject(new Error(res.message || 'Error'));
  },
  (error) => {
    let errorMessage = '网络请求出错，请稍后再试';

    if (error.response) {
      // 根据 HTTP 状态码处理
      switch (error.response.status) {
        case 401:
          errorMessage = '登录状态已过期，请重新登录';
          // 清除用户状态
          useUserStore.getState().clearUser();
          // 可选：跳转到登录页
          // Taro.redirectTo({ url: '/pages/login/index' });
          break;
        case 403:
          errorMessage = '您没有权限访问';
          break;
        case 404:
          errorMessage = '请求的资源未找到';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
          break;
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      errorMessage = '无法连接到服务器，请检查您的网络';
    }

    Taro.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 2000,
    });

    return Promise.reject(error);
  }
);

// 直接导出配置好的 axios 实例
export default http;
