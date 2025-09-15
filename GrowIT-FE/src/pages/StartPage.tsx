import { useState } from "react"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"

function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)

  const buttonStore = useButtonStore()
  const gameDataState = useGameDataStore()

  const newGame = () => {
    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)
    
    gameDataState.setCurrentProject("")
    gameDataState.setEmployeeCount(0)
    gameDataState.setEnterpriseValue(1000)
    gameDataState.setFinance(1000000)
    gameDataState.setProductivity(10)
    gameDataState.setTurn(1)
    gameDataState.setOfficeLevel(0)
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
              () => {
                setIsNewGame(true)
                newGame()
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