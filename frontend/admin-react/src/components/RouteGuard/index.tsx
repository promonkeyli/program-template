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
		const currentPath = location.pathname;
		
		// 如果用户未登录
		if (!isAuthenticated) {
			// 如果访问的是管理后台路由，重定向到登录页
			if (currentPath.startsWith('/admin') || currentPath === '/') {
				navigate({ to: "/login" });
			}
		} else {
			// 如果用户已登录
			// 如果访问的是登录页，重定向到管理后台首页
			if (currentPath === "/login") {
				navigate({ to: "/admin" });
			}
			// 如果访问的是根路径，重定向到管理后台首页
			if (currentPath === "/") {
				navigate({ to: "/admin" });
			}
		}
	}, [isAuthenticated, location.pathname, navigate]);

	// 如果用户未登录且访问的是受保护的路由，不渲染子组件
	if (!isAuthenticated && (location.pathname.startsWith('/admin') || location.pathname === '/')) {
		return null;
	}

	return <>{children}</>;
}
