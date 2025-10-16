import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ESM中 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			generatedRouteTree: "./src/routes/routeTree.gen.ts", // 手动指定routeTree.gen.ts 生成的位置
		}),
		react({
			babel: {
				// React Compiler 编译器 v1.0 支持
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
		tailwindcss(),
	],
	envDir: path.resolve(__dirname, "env"),
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
