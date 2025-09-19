// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Project = {
//   name: string
//   turn: number
//   reward: number
// }

// export type SaveData = {
//   saveId: number
//   companyName: string
//   turn: number
//   money: number
//   value: number
//   productivity: number
//   staffIds: {
//     id: number
//     productivity: number
//   }[]
//   project: {
//     id: number
//     endTurn: number
//   }[]
//   date: string
// }

// type SaveState = {
//     saves: SaveData[]
//     currentSaveId: number

//     setSave: (index: number, value: SaveData) => void
//     setCurrentSaveId: (value: number) => void

//     setHiringArray: (arr: number[]) => void
//     setMarketingArray: (arr: number[]) => void
//     setInvestmentArray: (arr: number[]) => void
//     setProjectArray: (arr: number[]) => void

//     setHiredPerson: (value: number[]) => void
// }

// export const defaultSave: SaveData = {
//   saveId: -1,
//   enterpriseValue: 1000,
//   productivity: 100,
//   finance: 1000000,
//   employeeCount: 0,
//   turn: 0,
//   currentProject: {
//     name: "",
//     turn: 0,
//     reward: 0,
//   },
//   officeLevel: 0,
//   updatedAt: new Date().toISOString().split("T")[0],

//   hiringArray: [0, 0, 0],
//   marketingArray: [0, 0, 0],
//   investmentArray: [0, 0],
//   projectArray: [0, 0, 0],
  
//   hiredPerson: [],
// }

// export const useSaveStore = create<SaveState>()(
//   persist(
//     (set) => ({
//       saves: [defaultSave, defaultSave, defaultSave],
//       currentSaveId: 0,

//       setSave: (index, value) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           newSaves[index] = value
//           return { saves: newSaves }
//         }),
//       setCurrentSaveId: (value: number) =>
//         set(() => ({ currentSaveId: value })),
//             setHiringArray: (arr) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           const save = { ...newSaves[state.currentSaveId], hiringArray: arr }
//           newSaves[state.currentSaveId] = save
//           return { saves: newSaves }
//         }),

//       setMarketingArray: (arr) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           const save = { ...newSaves[state.currentSaveId], marketingArray: arr }
//           newSaves[state.currentSaveId] = save
//           return { saves: newSaves }
//         }),

//       setInvestmentArray: (arr) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           const save = { ...newSaves[state.currentSaveId], investmentArray: arr }
//           newSaves[state.currentSaveId] = save
//           return { saves: newSaves }
//         }),

//       setProjectArray: (arr) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           const save = { ...newSaves[state.currentSaveId], projectArray: arr }
//           newSaves[state.currentSaveId] = save
//           return { saves: newSaves }
//         }),

//       setHiredPerson: (value) =>
//         set((state) => {
//           const newSaves = [...state.saves]
//           const save = { ...newSaves[state.currentSaveId], hiredPerson: value }
//           newSaves[state.currentSaveId] = save
//           return { saves: newSaves }
//         }),
//     }),
//     {
//       name: "save-storage",
//     }
//   )
// )