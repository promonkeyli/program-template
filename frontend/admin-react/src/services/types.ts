/**
 * @description: 请求涉及的一些ts类型
 */
export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T;
}
