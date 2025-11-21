import { create } from 'zustand';
import type { UserState } from './type';

const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  token: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ userInfo: null, token: null }),
}));

export default useUserStore;
