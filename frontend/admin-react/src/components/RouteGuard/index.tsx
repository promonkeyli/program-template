/**
 * @description: 全局路由守卫组件
 */
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

interface RouteGuardProps {
	children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		// 如果用户未登录且不在登录页面，则重定向到登录页面
		if (!isAuthenticated && location.pathname !== "/login") {
			navigate({ to: "/login" });
		}
	}, [isAuthenticated, location.pathname, navigate]);

	// 如果用户未登录,且当前不是登录页面，不渲染子组件
	if (!isAuthenticated && location.pathname !== "/login") {
		return null;
	}

	return <>{children}</>;
}
