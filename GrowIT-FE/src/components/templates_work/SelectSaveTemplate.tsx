import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useButtonStore } from "../../stores/buttonStore";
import { type SaveApiResponse, fetchSaves, deleteSave } from "../../apis/saveApi";
import { loadData } from "../../hooks/SelectSave";
import SaveButton from "../atoms/Button";


const saveButtonSize = 800; // 세이브 버튼 최대 사이즈

const MAX_SAVE_SLOTS = 3

type SelectSaveTemplateProps = {
  onIsNewGame: (idx: number) => void
}

// 세이브 선택 템플릿
function SelectSaveTemplate({ onIsNewGame }: SelectSaveTemplateProps) {
  const navigate = useNavigate()
  const buttonStore = useButtonStore()

  const [saves, setSaves] = useState<SaveApiResponse["saveList"]>([])

  useEffect(() => {
    fetchSaves()
      .then((data) => {
        const serverSaves = data.saveList
        const filled = [
          ...serverSaves,
          ...Array.from({ length: MAX_SAVE_SLOTS - serverSaves.length }, () => ({
            saveId: -1,
            companyName: "",
            turn: 0,
            money: 0,
            value: 0,
            productivity: 0,
            staffIds: [],
            project: [],
            date: "",
          }))
        ]
        setSaves(filled)
      })
      .catch((err) => console.error("세이브 로드 실패", err))
  }, [])


  // const onDeleteSave = (idx: number, value: SaveData) => {
  //   saveStore.setSave(idx, value)
  // }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center w-1/2">
        {saves.map((save, idx) => (
          <SaveButton
            key={idx}
            maxSize={saveButtonSize}
            className="w-9/10 bg-orange-300 text-black px-6 py-6 rounded hover:bg-orange-400 transition-colors my-5 font-bold"
            onClick={() =>
              {
                if (save.saveId != -1) {
                  loadData(save)
                  buttonStore.setMarketingButton(true)
                  buttonStore.setInvestmentButton(true)
                  buttonStore.setProjectButton(true)
                } else {
                  onIsNewGame(idx)
                }
                navigate("/main")
              }
            }
          >
            {
              save.saveId != -1
              ? (
                <div className="w-full flex items-center justify-center">
                  <p className="text-center w-full truncate">
                    {save.turn}턴 | {save.companyName} | 기업가치: {save.value} | 생산성: {save.productivity} | 자금: {save.date}
                  </p>
                  <div className="flex items-center justify-end">
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSave(save.saveId)
                      }}
                      className="bg-red-300 text-white px-3 py-0 rounded hover:bg-red-400 transition-colors"
                    >
                      X
                    </div>
                  </div>
                </div>
                )
              : "New Game" 
            }
          </SaveButton>
        ))}
      </div>
    </div>
  )
}

export default SelectSaveTemplate