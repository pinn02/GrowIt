import { create } from "zustand";
import { persist } from "zustand/middleware";

type buttonState = {
  hiringButton1: boolean
  hiringButton2: boolean
  hiringButton3: boolean
  marketingButton1: boolean
  marketingButton2: boolean
  marketingButton3: boolean
  investmentButton1: boolean
  investmentButton2: boolean
  investmentButton3: boolean
  projectButton1: boolean
  projectButton2: boolean
  projectButton3: boolean
}

export const useButtonStore = create<buttonState>()(
  persist(
    (set) => ({
      hiringButton1: true,
      hiringButton2: true,
      hiringButton3: true,
      marketingButton1: true,
      marketingButton2: true,
      marketingButton3: true,
      investmentButton1: true,
      investmentButton2: true,
      investmentButton3: true,
      projectButton1: true,
      projectButton2: true,
      projectButton3: true,
    }),
    {
      name: "button-storage"
    }
  )
)