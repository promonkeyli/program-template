/**
 * HTTP 工具相关的 TypeScript 类型定义
 */

/**
 * 后端返回的基础数据结构
 */
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
