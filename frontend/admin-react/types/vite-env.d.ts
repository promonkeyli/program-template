interface ImportMetaEnv {
	/* 网站标题 */
	readonly VITE_APP_TITLE: string;
	/* 请求前缀 */
	readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
