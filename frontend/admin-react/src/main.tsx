import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routes/routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
