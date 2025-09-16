import DeleteButton from "../atoms/Button"
import { useSaveStore } from "../../stores/saveStore";
import SaveButton from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useButtonStore } from "../../stores/buttonStore";

type SelectSaveTemplateProps = {
  onIsNewGame: (idx: number) => void
}

const defaultSave = {
  enterpriseValue: 1000,
  productivity: 100,
  finance: 1000000,
  employeeCount: 0,
  turn: 0,
  currentProject: "",
  officeLevel: 0,
  updatedAt: new Date().toISOString().split("T")[0],
}

const saveList = [
  { name: "Save 1", enterpriseValue: 1000, updatedAt: "2025-01-01" },
  { name: "Save 2", enterpriseValue: 2000, updatedAt: "2025-02-02" },
  { name: "", enterpriseValue: 0, updatedAt: "" }
]

function SelectSaveTemplate({ onIsNewGame }: SelectSaveTemplateProps) {
  const saveButtonSize = 800;
  const navigate = useNavigate()

  const saveStore = useSaveStore()
  const gameDataStore = useGameDataStore()
  const buttonStore = useButtonStore()

  const onDeleteSave = (idx: number, value: object) => {
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
                  buttonStore.setHiringButton2(true)
                  buttonStore.setHiringButton3(true)
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
                  <p className="text-center w-full">{save.turn}턴 | 기업가치: {save.enterpriseValue} | 생산성: {save.productivity} | 자금: {save.finance} | {save.updatedAt}</p>
                  <div className="flex items-center justify-end">
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSave(idx, defaultSave)
                      }}
                      className="bg-red-300 text-white px-3 py-0 rounded hover:bg-red-400 transition-colors"
                    >
                      X
                    </DeleteButton>
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