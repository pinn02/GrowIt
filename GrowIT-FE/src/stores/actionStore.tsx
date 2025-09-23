import { create } from "zustand";
import { persist } from "zustand/middleware";

type actionState = {
  hiringArray: number[]
  marketingArray: number[]
  investmentArray: number[]
  projectArray: number[]

  setHiringArray: (value: number[]) => void
  setMarketingArray: (value: number[]) => void
  setInvestmentArray: (value: number[]) => void
  setProjectArray: (value: number[]) => void
}

export const useActionStore = create<actionState>()(
  persist(
    (set) => ({
      hiringArray: [0, 0, 0],
      marketingArray: [0, 0, 0],
      investmentArray: [0, 0],
      projectArray: [0, 0, 0],

      setHiringArray: (value: number[]) =>
        set(() => ({ hiringArray: value })),
      setMarketingArray: (value: number[]) =>
        set(() => ({ marketingArray: value })),
      setInvestmentArray: (value: number[]) =>
        set(() => ({ investmentArray: value })),
      setProjectArray: (value: number[]) =>
        set(() => ({ projectArray: value })),
    }),
    {
      name: "action-storage"
    }
  )
)