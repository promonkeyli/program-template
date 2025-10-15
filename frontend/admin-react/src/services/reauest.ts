/**
 * @description: 基于Axios的请求简易封装
 */

import axios from "axios";
import { useAuthStore } from "@/stores/auth.ts";

// axios 实例
const request = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 1000,
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});

// 请求白名单，在数组里的不需要进行鉴权
const whiteList = ["/login"];

// -------------------------- 请求拦截器 --------------------------
request.interceptors.request.use(
	(config) => {
		// 白名单判断
		if (config.url && whiteList.includes(config.url)) {
			return config;
		}

		// 添加token
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log("请求参数错误", error);
		return Promise.reject(error);
	},
);

// -------------------------- 响应拦截器 --------------------------
request.interceptors.response.use((response) => {
	const { status, statusText } = response;
	if (status === 200) {
		return response.data;
	} else {
		switch (status) {
			case 401:
				// 示例：未授权（token过期或无效），跳转到登录页
				console.log("登录已过期，请重新登录");
				// router.push('/login'); // 需引入路由实例
				break;
			case 403:
				console.log("没有权限执行该操作");
				break;
			case 404:
				console.log(`接口不存在：${response.config.url}`);
				break;
			case 500:
				console.log("服务器内部错误，请稍后重试");
				break;
			default:
				console.log(`请求失败：${status} ${statusText}`);
		}

		return Promise.reject(statusText);
	}
});

export default request;
