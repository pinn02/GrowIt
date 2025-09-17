import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Project = {
  name: string
  turn: number,
  reward: number,
}

type GameDataState = {
  enterpriseValue: number;
  productivity: number;
  finance: number;
  employeeCount: number;
  turn: number;
  currentProject: Project;
  officeLevel: number;

  hiringArray: number[],
  marketingArray: number[],
  investmentArray: number[],
  projectArray: number[],

  hiredPerson: number[],

  setEnterpriseValue: (value: number) => void
  setProductivity: (value: number) => void
  setFinance: (value: number) => void
  setEmployeeCount: (value: number) => void
  setTurn: (value: number) => void
  setCurrentProject: (value: Project) => void
  setOfficeLevel: (value: number) => void

  setHiringArray: (value: number[]) => void
  setMarketingArray: (value: number[]) => void
  setInvestmentArray: (value: number[]) => void
  setProjectArray: (value: number[]) => void

  setHiredPerson: (value: number[]) => void
}

export const useGameDataStore = create<GameDataState>()(
  persist(
    (set) => ({
      enterpriseValue: 1000,
      productivity: 100,
      finance: 1000000,
      employeeCount: 0,
      turn: 1,
      currentProject: {
        name: "",
        turn: 0,
        reward: 0,
      },
      officeLevel: 0,

      hiringArray: [0, 0, 0],
      marketingArray: [0, 0, 0],
      investmentArray: [0, 0],
      projectArray: [0, 0, 0],

      hiredPerson: [],

      setEnterpriseValue: (value: number) =>
        set(() => ({ enterpriseValue: value })),
      setProductivity: (value: number) =>
        set(() => ({ productivity: value })),
      setFinance: (value: number) =>
        set(() => ({ finance: value })),
      setEmployeeCount: (value: number) =>
        set(() => ({ employeeCount: value })),
      setTurn: (value: number) =>
        set(() => ({ turn: value })),
      setCurrentProject: (value: Project) =>
        set(() => ({ currentProject: value })),
      setOfficeLevel: (value: number) =>
        set(() => ({ officeLevel: value })),

      setHiringArray: (value: number[]) =>
        set(() => ({ hiringArray: value })),
      setMarketingArray: (value: number[]) =>
        set(() => ({ marketingArray: value })),
      setInvestmentArray: (value: number[]) =>
        set(() => ({ investmentArray: value })),
      setProjectArray: (value: number[]) =>
        set(() => ({ projectArray: value })),
      setHiredPerson: (value: number[]) =>
        set(() => ({ hiredPerson: value }))
    }),
    {
      name: "game-data-storage",
    }
  )
)