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
  selectedCeo: number | null;

  // 업그레이드 레벨들
  commuteBusLevel: number;
  dormitoryLevel: number;
  gymLevel: number;
  cafeteriaLevel: number;
  hospitalLevel: number;
  daycareLevel: number;
  bookCafeLevel: number;
  buildingLevel: number;

  hiringArray: number[],
  marketingArray: number[],
  investmentArray: number[],
  projectArray: number[],

  hiredPerson: number[],

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

  setSelectedCeo: (value: number | null) => void
  setEnterpriseValue: (value: number) => void
  setProductivity: (value: number) => void
  setFinance: (value: number) => void
  setEmployeeCount: (value: number) => void
  setTurn: (value: number) => void
  setCurrentProject: (value: Project) => void
  setOfficeLevel: (value: number) => void

  // 업그레이드 레벨 설정 함수들
  setCommuteBusLevel: (value: number) => void
  setDormitoryLevel: (value: number) => void
  setGymLevel: (value: number) => void
  setCafeteriaLevel: (value: number) => void
  setHospitalLevel: (value: number) => void
  setDaycareLevel: (value: number) => void
  setBookCafeLevel: (value: number) => void
  setBuildingLevel: (value: number) => void

  setHiringArray: (value: number[]) => void
  setMarketingArray: (value: number[]) => void
  setInvestmentArray: (value: number[]) => void
  setProjectArray: (value: number[]) => void

  setHiredPerson: (value: number[]) => void

  setHiringInput: (value: number) => void
  setHiringOutput: (value: number) => void
  setMarketingInput: (value: number) => void
  setMarketingOutput: (value: number) => void
  setInvestmentInput: (value: number) => void
  setInvestmentOutput: (value: number) => void
  setProjectInput: (value: number) => void
  setProjectOutput: (value: number) => void
  setGoodRandomEventEnterpriseValue: (value: number) => void
  setGoodRandomEventProductivity: (value: number) => void
  setGoodRandomEventFinance: (value: number) => void
  setBadRandomEventEnterpriseValue: (value: number) => void
  setBadRandomEventProductivity: (value: number) => void
  setBadRandomEventFinance: (value: number) => void
}

export const useGameDataStore = create<GameDataState>()(
  persist(
    (set) => ({
      enterpriseValue: 1000000,
      productivity: 100,
      finance: 1000000000,
      employeeCount: 0,
      turn: 1,
      currentProject: {
        name: "",
        turn: 0,
        reward: 0,
      },
      officeLevel: 1,

      // 업그레이드 레벨들
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
      selectedCeo: null,

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

      setSelectedCeo: (value: number | null) =>
        set(() => ({ selectedCeo: value })),
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

      // 업그레이드 레벨 설정 함수들
      setCommuteBusLevel: (value: number) =>
        set(() => ({ commuteBusLevel: value })),
      setDormitoryLevel: (value: number) =>
        set(() => ({ dormitoryLevel: value })),
      setGymLevel: (value: number) =>
        set(() => ({ gymLevel: value })),
      setCafeteriaLevel: (value: number) =>
        set(() => ({ cafeteriaLevel: value })),
      setHospitalLevel: (value: number) =>
        set(() => ({ hospitalLevel: value })),
      setDaycareLevel: (value: number) =>
        set(() => ({ daycareLevel: value })),
      setBookCafeLevel: (value: number) =>
        set(() => ({ bookCafeLevel: value })),
      setBuildingLevel: (value: number) =>
        set(() => ({ buildingLevel: value })),

      setHiringArray: (value: number[]) =>
        set(() => ({ hiringArray: value })),
      setMarketingArray: (value: number[]) =>
        set(() => ({ marketingArray: value })),
      setInvestmentArray: (value: number[]) =>
        set(() => ({ investmentArray: value })),
      setProjectArray: (value: number[]) =>
        set(() => ({ projectArray: value })),
      setHiredPerson: (value: number[]) =>
        set(() => ({ hiredPerson: value })),

      setHiringInput: (value: number) => 
        set(() => ({ hiringInput: value })),
      setHiringOutput: (value: number) =>
        set(() => ({ hiringOutput: value })),
      setMarketingInput: (value: number) =>
        set(() => ({ marketingInput: value })),
      setMarketingOutput: (value: number) =>
        set(() => ({ marketingOutput: value })),
      setInvestmentInput: (value: number) =>
        set(() => ({ investmentInput: value })),
      setInvestmentOutput: (value: number) =>
        set(() => ({ investmentOutput: value })),
      setProjectInput: (value: number) =>
        set(() => ({ projectInput: value })),
      setProjectOutput: (value: number) =>
        set(() => ({ projectOutput: value })),
      setGoodRandomEventEnterpriseValue: (value: number) =>
        set(() => ({ goodRandomEventEnterpriseValue: value })),
      setGoodRandomEventProductivity: (value: number) =>
        set(() => ({ goodRandomEventProductivity: value })),
      setGoodRandomEventFinance: (value: number) =>
        set(() => ({ goodRandomEventFinance: value })),
      setBadRandomEventEnterpriseValue: (value: number) =>
        set(() => ({ badRandomEventEnterpriseValue: value })),
      setBadRandomEventProductivity: (value: number) =>
        set(() => ({ badRandomEventProductivity: value })),
      setBadRandomEventFinance: (value: number) =>
        set(() => ({ badRandomEventFinance: value })),
    }),
    {
      name: "game-data-storage",
    }
  )
)