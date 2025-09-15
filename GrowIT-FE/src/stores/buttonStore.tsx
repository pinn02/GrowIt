import { create } from "zustand";
import { persist } from "zustand/middleware";

type buttonState = {
  hiringButton1: boolean
  hiringButton2: boolean
  hiringButton3: boolean
  marketingButton: boolean
  investmentButton: boolean
  projectButton: boolean
  
  setHiringButton1: (value: boolean) => void
  setHiringButton2: (value: boolean) => void
  setHiringButton3: (value: boolean) => void
  setMarketingButton: (value: boolean) => void
  setInvestmentButton: (value: boolean) => void
  setProjectButton: (value: boolean) => void
}

export const useButtonStore = create<buttonState>()(
  persist(
    (set) => ({
      hiringButton1: true,
      hiringButton2: true,
      hiringButton3: true,
      marketingButton: true,
      investmentButton: true,
      projectButton: true,

      setHiringButton1: (value: boolean) =>
        set(() => ({ hiringButton1: value })),
      setHiringButton2: (value: boolean) =>
        set(() => ({ hiringButton2: value })),
      setHiringButton3: (value: boolean) =>
        set(() => ({ hiringButton3: value })),
      setMarketingButton: (value: boolean) =>
        set(() => ({ marketingButton: value })),
      setInvestmentButton: (value: boolean) =>
        set(() => ({ investmentButton: value })),
      setProjectButton: (value: boolean) =>
        set(() => ({ projectButton: value })),

    }),
    {
      name: "button-storage"
    }
  )
)