import { create } from "zustand";
import { persist } from "zustand/middleware";

type buttonState = {
  hiringButton: boolean
  marketingButton: boolean
  investmentButton: boolean
  projectButton: boolean
  
  setHiringButton: (value: boolean) => void
  setMarketingButton: (value: boolean) => void
  setInvestmentButton: (value: boolean) => void
  setProjectButton: (value: boolean) => void
}

export const useButtonStore = create<buttonState>()(
  persist(
    (set) => ({
      hiringButton: true,
      marketingButton: true,
      investmentButton: true,
      projectButton: true,

      setHiringButton: (value: boolean) =>
        set(() => ({ hiringButton: value })),
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