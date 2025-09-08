import { create } from "zustand";

interface UIState {
  openMenu: string | null;
  setOpenMenu: (menu: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  openMenu: null,
  setOpenMenu: (menu) => set({ openMenu: menu }),
}));

