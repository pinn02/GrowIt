import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Project = {
  name: string
  turn: number
  reward: number
}

export type SaveData = {
  enterpriseValue: number
  productivity: number
  finance: number
  employeeCount: number
  turn: number
  currentProject: Project
  officeLevel: number
  updatedAt: string

  commuteBusLevel: number
  dormitoryLevel: number
  gymLevel: number
  cafeteriaLevel: number
  hospitalLevel: number
  daycareLevel: number
  bookCafeLevel: number
  buildingLevel: number

  hiringArray: number[]
  marketingArray: number[]
  investmentArray: number[]
  projectArray: number[]

  hiredPerson: number[]

  hiringInput: number
  hiringOutput: number
  marketingInput: number
  marketingOutput: number
  investmentInput: number
  investmentOutput: number
  projectInput: number
  projectOutput: number
  goodRandomEventEnterpriseValue: number
  goodRandomEventProductivity: number
  goodRandomEventFinance: number
  badRandomEventEnterpriseValue: number
  badRandomEventProductivity: number
  badRandomEventFinance: number
}

type SaveState = {
  saves: SaveData[]
  currentSaveIdx: number

  setSave: (index: number, value: SaveData) => void
  setCurrentSaveIdx: (value: number) => void

  setHiringArray: (arr: number[]) => void
  setMarketingArray: (arr: number[]) => void
  setInvestmentArray: (arr: number[]) => void
  setProjectArray: (arr: number[]) => void

  setHiredPerson: (value: number[]) => void
}

export const defaultSave: SaveData = {
  enterpriseValue: 0,
  productivity: 0,
  finance: 1000000,
  employeeCount: 0,
  turn: 0,
  currentProject: {
    name: "",
    turn: 0,
    reward: 0,
  },
  officeLevel: 1,
  updatedAt: new Date().toISOString().split("T")[0],

  // 업그레이드 레벨들 초기값
  commuteBusLevel: 1,
  dormitoryLevel: 1,
  gymLevel: 1,
  cafeteriaLevel: 1,
  hospitalLevel: 1,
  daycareLevel: 1,
  bookCafeLevel: 1,
  buildingLevel: 1,

  hiringArray: [0, 0, 0],
  marketingArray: [0, 0, 0],
  investmentArray: [0, 0],
  projectArray: [0, 0, 0],
  
  hiredPerson: [],

  hiringInput: 1,
  hiringOutput: 1,
  marketingInput: 1,
  marketingOutput: 1,
  investmentInput: 1,
  investmentOutput: 1,
  projectInput: 1,
  projectOutput: 1,
  goodRandomEventEnterpriseValue: 1,
  goodRandomEventProductivity: 1,
  goodRandomEventFinance: 1,
  badRandomEventEnterpriseValue: 1,
  badRandomEventProductivity: 1,
  badRandomEventFinance: 1,
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
            setHiringArray: (arr) =>
        set((state) => {
          const newSaves = [...state.saves]
          const save = { ...newSaves[state.currentSaveIdx], hiringArray: arr }
          newSaves[state.currentSaveIdx] = save
          return { saves: newSaves }
        }),

      setMarketingArray: (arr) =>
        set((state) => {
          const newSaves = [...state.saves]
          const save = { ...newSaves[state.currentSaveIdx], marketingArray: arr }
          newSaves[state.currentSaveIdx] = save
          return { saves: newSaves }
        }),

      setInvestmentArray: (arr) =>
        set((state) => {
          const newSaves = [...state.saves]
          const save = { ...newSaves[state.currentSaveIdx], investmentArray: arr }
          newSaves[state.currentSaveIdx] = save
          return { saves: newSaves }
        }),

      setProjectArray: (arr) =>
        set((state) => {
          const newSaves = [...state.saves]
          const save = { ...newSaves[state.currentSaveIdx], projectArray: arr }
          newSaves[state.currentSaveIdx] = save
          return { saves: newSaves }
        }),

      setHiredPerson: (value) =>
        set((state) => {
          const newSaves = [...state.saves]
          const save = { ...newSaves[state.currentSaveIdx], hiredPerson: value }
          newSaves[state.currentSaveIdx] = save
          return { saves: newSaves }
        }),
    }),
    {
      name: "save-storage",
    }
  )
)