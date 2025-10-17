import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import RouteGuard from "@/components/RouteGuard";

const RootLayout = () => (
	<>
		<RouteGuard>
			<Outlet />
		</RouteGuard>
		<TanStackRouterDevtools />
	</>
);

export const Route = createRootRoute({ component: RootLayout });
