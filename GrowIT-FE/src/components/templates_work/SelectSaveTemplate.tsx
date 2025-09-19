import { useNavigate } from "react-router-dom";
import { useSaveStore } from "../../stores/saveStore";
import { useButtonStore } from "../../stores/buttonStore";
import { useGameDataStore } from "../../stores/gameDataStore";
import  { defaultSave } from "../../stores/saveStore"
import type { SaveData } from "../../stores/saveStore"
import SaveButton from "../atoms/Button";

const saveButtonSize = 800; // 세이브 버튼 최대 사이즈

type SelectSaveTemplateProps = {
  onIsNewGame: (idx: number) => void
}

// 세이브 선택 템플릿
function SelectSaveTemplate({ onIsNewGame }: SelectSaveTemplateProps) {
  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const gameDataStore = useGameDataStore()
  const buttonStore = useButtonStore()

  const onDeleteSave = (idx: number, value: SaveData) => {
    saveStore.setSave(idx, value)
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center w-1/2">
        {saveStore.saves.map((save, idx) => (
          <SaveButton
            key={idx}
            maxSize={saveButtonSize}
            className="w-9/10 bg-orange-300 text-black px-6 py-6 rounded hover:bg-orange-400 transition-colors my-5 font-bold"
            onClick={() =>
              {
                saveStore.setCurrentSaveIdx(idx)
                const currentSave = saveStore.saves[idx]
                if (save.turn > 0) {
                  buttonStore.setMarketingButton(true)
                  buttonStore.setInvestmentButton(true)
                  buttonStore.setProjectButton(true)
                  gameDataStore.setEnterpriseValue(currentSave.enterpriseValue)
                  gameDataStore.setProductivity(currentSave.productivity)
                  gameDataStore.setFinance(currentSave.finance)
                  gameDataStore.setEmployeeCount(currentSave.employeeCount)
                  gameDataStore.setTurn(currentSave.turn)
                  gameDataStore.setCurrentProject(currentSave.currentProject)
                  gameDataStore.setOfficeLevel(currentSave.officeLevel)
                  gameDataStore.setHiringArray(currentSave.hiringArray)
                  gameDataStore.setMarketingArray(currentSave.marketingArray)
                  gameDataStore.setInvestmentArray(currentSave.investmentArray)
                  gameDataStore.setProjectArray(currentSave.projectArray)
                  gameDataStore.setHiredPerson(currentSave.hiredPerson)
                  navigate("/main")
                } else {
                  onIsNewGame(idx)
                }
              }
            }
          >
            {
              save.turn > 0
              ? (
                <div className="w-full flex items-center justify-center">
                  <p className="text-center w-full truncate">
                    {save.turn}턴 | 기업가치: {save.enterpriseValue} | 생산성: {save.productivity} | 자금: {save.finance} | {save.updatedAt}
                  </p>
                  <div className="flex items-center justify-end">
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSave(idx, defaultSave)
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