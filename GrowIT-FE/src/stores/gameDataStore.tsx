import { create } from "zustand";
import { persist } from "zustand/middleware";

type gameDataState = {
  enterpriseValue: number;
  productivity: number;
  finance: number;
  employeeCount: number;
  turn: number;
  currentProject: string;
}

export const useGameDataStore = create<gameDataState>()(
  persist(
    (set) => ({
      enterpriseValue: 1000,
      productivity: 100,
      finance: 1000000,
      employeeCount: 0,
      turn: 1,
      currentProject: ""
    }),
    {
      name: "game-data-storage",
    }
  )
)