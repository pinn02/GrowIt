import axios from "axios";

const SAVE_API_URL = "api/v1/saved"

export type SaveApiResponse = {
  saveList: {
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
  }[]
}

export async function fetchSaves(): Promise<SaveApiResponse> {
  const res = await axios.get<SaveApiResponse>(SAVE_API_URL)
  return res.data
}

export async function newGame(companyName: string): Promise<void> {
  const res = await axios.post(SAVE_API_URL + companyName)
  return res.data
}

export async function deleteSave(saveId: number): Promise<void> {
  const res = await axios.delete(SAVE_API_URL + saveId)
  return res.data
}