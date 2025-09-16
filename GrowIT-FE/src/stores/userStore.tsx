import { create } from "zustand";
import { persist } from "zustand/middleware";

type userState = {
    token: string
}

export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      token: ""
    }),
    {
      name: "user-storage",
    }
  )
)

