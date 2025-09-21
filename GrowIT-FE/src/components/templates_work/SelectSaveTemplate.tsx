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
                  // 업그레이드 레벨들 로드 (기본값 1로 설정)
                  gameDataStore.setCommuteBusLevel(currentSave.commuteBusLevel || 1)
                  gameDataStore.setDormitoryLevel(currentSave.dormitoryLevel || 1)
                  gameDataStore.setGymLevel(currentSave.gymLevel || 1)
                  gameDataStore.setCafeteriaLevel(currentSave.cafeteriaLevel || 1)
                  gameDataStore.setHospitalLevel(currentSave.hospitalLevel || 1)
                  gameDataStore.setDaycareLevel(currentSave.daycareLevel || 1)
                  gameDataStore.setBookCafeLevel(currentSave.bookCafeLevel || 1)
                  
                  // buildingLevel 로드 및 officeLevel과 동기화
                  // gameDataStore의 persist된 값과 비교하여 더 높은 값 사용
                  const savedBuildingLevel = currentSave.buildingLevel || 1;
                  const currentBuildingLevel = gameDataStore.buildingLevel;
                  const finalBuildingLevel = Math.max(savedBuildingLevel, currentBuildingLevel);
                  
                  console.log('로드될 세이브 데이터:', currentSave);
                  console.log('저장된 buildingLevel:', savedBuildingLevel, '현재 gameStore buildingLevel:', currentBuildingLevel);
                  console.log('최종 선택된 buildingLevel:', finalBuildingLevel);
                  
                  gameDataStore.setBuildingLevel(finalBuildingLevel);
                  gameDataStore.setOfficeLevel(finalBuildingLevel);
                  console.log('세이브 로드 완료: buildingLevel =', finalBuildingLevel, 'officeLevel =', finalBuildingLevel);
                  
                  gameDataStore.setHiringArray(currentSave.hiringArray)
                  gameDataStore.setMarketingArray(currentSave.marketingArray)
                  gameDataStore.setInvestmentArray(currentSave.investmentArray)
                  gameDataStore.setProjectArray(currentSave.projectArray)
                  gameDataStore.setHiredPerson(currentSave.hiredPerson)
                  
                  // 로드 직후 saveStore를 최신 상태로 업데이트하여 동기화
                  const syncedSave = {
                    ...currentSave,
                    buildingLevel: finalBuildingLevel,
                    officeLevel: finalBuildingLevel,
                    commuteBusLevel: gameDataStore.commuteBusLevel,
                    dormitoryLevel: gameDataStore.dormitoryLevel,
                    gymLevel: gameDataStore.gymLevel,
                    cafeteriaLevel: gameDataStore.cafeteriaLevel,
                    hospitalLevel: gameDataStore.hospitalLevel,
                    daycareLevel: gameDataStore.daycareLevel,
                    bookCafeLevel: gameDataStore.bookCafeLevel,
                  };
                  saveStore.setSave(idx, syncedSave);
                  console.log('로드 후 saveStore 동기화 완료:', syncedSave);
                  
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