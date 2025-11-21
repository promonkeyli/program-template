/**
 * 用户模块相关的 API 服务
 */
import http from '@/utils/http';
import type { GetUserProfileResponse, UserProfile } from './type';

/**
 * 根据用户 ID 获取用户信息
 * @param userId 用户 ID
 * @returns Promise<UserProfile>
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  // 使用泛型来指定期望的响应体结构
  const response = await http.get<GetUserProfileResponse>(`/api/users/${userId}`);

  // 假设 http 实例会自动处理 code 和 message，直接返回 data
  // 如果不是，你可能需要在这里添加错误处理逻辑
  // 例如: if (response.code !== 200) throw new Error(response.message);
  return response.data;
};
