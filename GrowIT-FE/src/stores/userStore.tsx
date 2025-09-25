import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      clearUser: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: "user-storage",
    }
  )
)

