import { create } from "zustand";
import { persist } from "zustand/middleware";

type SaveData = Record<string, any>

type SaveState = {
    saves: SaveData[]
    currentSaveIdx: number

    setSave: (index: number, value: SaveData) => void
    setCurrentSaveIdx: (value: number) => void
}

const defaultSave = {
  enterpriseValue: 1000,
  productivity: 100,
  finance: 1000000,
  employeeCount: 0,
  turn: 0,
  currentProject: "",
  officeLevel: 0,
  updatedAt: new Date().toISOString().split("T")[0],
}

export const useSaveStore = create<SaveState>()(
  persist(
    (set) => ({
      saves: [defaultSave, defaultSave, defaultSave],
      currentSaveIdx: 0,

      setSave: (index, value) =>
        set((state) => {
          const newSaves = [...state.saves]
          newSaves[index] = value
          return { saves: newSaves }
        }),
      setCurrentSaveIdx: (value: number) =>
        set(() => ({ currentSaveIdx: value })),
    }),
    {
      name: "save-storage",
    }
  )
)