import { useGameDataStore } from "../stores/gameDataStore"

export type SaveData = {
  saveId: number
  companyName: string
  turn: number
  money: number
  value: number
  productivity: number
  staffIds: {
    id: number
    productivity: number
  }[]
  project: {
    id: number
    endTurn: number
  }[]
  date: string
}

export async function loadData(value: SaveData) {
  const gameDataStore = useGameDataStore()
  gameDataStore.setGameData(value)
}

export async function newGame(value: SaveData) {
  
}