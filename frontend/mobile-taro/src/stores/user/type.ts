/**
 * 用户 Store 相关的 TypeScript 类型定义
 */

export interface UserState {
  /**
   * 用户信息
   */
  userInfo: {
    name: string;
    avatar: string;
  } | null;
  /**
   * 用户Token
   */
  token: string | null;
  /**
   * 设置用户信息
   * @param userInfo 用户信息
   */
  setUserInfo: (userInfo: UserState['userInfo']) => void;
  /**
   * 设置Token
   * @param token
   */
  setToken: (token: string) => void;
  /**
   * 清除用户状态（用于退出登录）
   */
  clearUser: () => void;
}
