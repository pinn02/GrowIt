import { create } from 'zustand';

interface User {
  email?: string;
  nickname?: string;
}

interface UserStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  
  setUser: (user: User) => set({ user }), // 사용자 정보
  setToken: (token: string) => set({ token }), // 인증 토큰 저장
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }), // 로그인 상태 설정 
  clearUser: () => set({ user: null, token: null, isLoggedIn: false }), // 모든 정보인 초기화
}));