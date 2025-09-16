import { useState } from "react"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"
import { useSaveStore } from "../stores/saveStore"

const newSave = {
  enterpriseValue: 1000,
  productivity: 100,
  finance: 1000000,
  employeeCount: 0,
  turn: 1,
  currentProject: "",
  officeLevel: 0,
  updatedAt: new Date().toISOString().split("T")[0],
}

function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)

  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const saveStore = useSaveStore()

  const newGame = (idx: number) => {
    const currentSave = saveStore.saves[idx]

    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)
    
    gameDataStore.setEnterpriseValue(currentSave.enterpriseValue)
    gameDataStore.setProductivity(currentSave.productivity)
    gameDataStore.setFinance(currentSave.finance)
    gameDataStore.setEmployeeCount(currentSave.employeeCount)
    gameDataStore.setTurn(1)
    gameDataStore.setCurrentProject(currentSave.currentProject)
    gameDataStore.setOfficeLevel(currentSave.officeLevel)

    saveStore.setSave(idx, newSave)
  }
  

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="absolute inset-0 flex w-[200%] h-full animate-scrollX">
          <img
            src={ loginPageBackgroundImage }
            alt="로그인 화면"
            className="w-1/2 h-full object-cover"
          />
          <img
            src={ loginPageBackgroundImage }
            alt="로그인 화면"
            className="w-1/2 h-full object-cover"
          />
        </div>
        {!isLoggedIn ? (
          <LoginTemplate onLogin={() => setIsLoggedIn(true)} />
        ) : !isNewGame ? (
          <SelectSaveTemplate
            onIsNewGame={
              (idx: number) => {
                setIsNewGame(true)
                newGame(idx)
              }
            }
          />
        ) : (
          <DifficultyTemplate />
        )}
      </div>
    </>
  )
}

export default StartPage