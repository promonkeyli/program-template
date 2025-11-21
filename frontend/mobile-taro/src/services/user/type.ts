/**
 * 用户模块相关的 TypeScript 类型定义
 */

/**
 * 用户基础信息
 */
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

/**
 * 获取用户信息的 API 响应体
 */
export interface GetUserProfileResponse {
  code: number;
  message: string;
  data: UserProfile;
}
