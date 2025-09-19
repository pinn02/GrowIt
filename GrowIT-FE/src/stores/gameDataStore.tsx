import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SaveData } from "../hooks/SelectSave";

type GameDataState = SaveData & {
  setMoney: (value: number) => void
  setValue: (value: number) => void
  setProductivity: (value: number) => void
  setGameData: (value: SaveData) => void
}

export const useGameDataStore = create<GameDataState>()(
  persist(
    (set) => ({
      saveId: -1,
      companyName: "",
      turn: 0,
      money: 0,
      value: 0,
      productivity: 0,
      staffIds: [
        {
          id: -1,
          productivity: 0
        }
      ],
      project: [
        {
          id: -1,
          endTurn: 0
        }
      ],
      date: "",
      setMoney: (value: number) =>
        set(() => ({ money: value })),
      setValue: (value: number) =>
        set(() => ({ value: value })),
      setProductivity: (value: number) =>
        set(() => ({ productivity: value })),
      setGameData: (value: SaveData ) =>
        set(() => ({ ...value })),
    }),
    {
      name: "game-data-storage",
    }
  )
)