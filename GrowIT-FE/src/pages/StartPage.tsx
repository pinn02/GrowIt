import { useState, useEffect } from "react"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"
import { useUserStore } from "../stores/userStore"
import { useSaveStore } from "../stores/saveStore"
import { getRandomUniqueArray } from "../hooks/CreateRandomArray"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"

const newSave = {
  enterpriseValue: 1000,
  productivity: 100,
  finance: 1000000,
  employeeCount: 0,
  turn: 1,
  currentProject: {
    name: "",
    turn: 0,
    reward: 0,
  },
  officeLevel: 0,
  updatedAt: new Date().toISOString().split("T")[0],

  hiringArray: [0, 0, 0],
  marketingArray: [0, 0, 0],
  investmentArray: [0, 0],
  projectArray: [0, 0, 0],

  hiredPerson: [],
}

// 시작 페이지
function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)

  const saveStore = useSaveStore()
  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const { isLoggedIn: storeIsLoggedIn } = useUserStore()

  // OAuth2 로그인 상태를 감지
  useEffect(() => {
    if (storeIsLoggedIn && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [storeIsLoggedIn, isLoggedIn]);

  const newGame = (idx: number = 0) => {
    buttonStore.setHiringButton(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)
    
    gameDataStore.setEnterpriseValue(newSave.enterpriseValue)
    gameDataStore.setProductivity(newSave.productivity)
    gameDataStore.setFinance(newSave.finance)
    gameDataStore.setEmployeeCount(newSave.employeeCount)
    gameDataStore.setTurn(1)
    gameDataStore.setCurrentProject(newSave.currentProject)
    gameDataStore.setOfficeLevel(newSave.officeLevel)

    const newHiringArray = getRandomUniqueArray(3, 0, 14)
    const newMarketingArray = getRandomUniqueArray(3, 0, 4)
    const newInvestmentArray = getRandomUniqueArray(2, 0, 14)
    const newProjectArray = getRandomUniqueArray(3, 0, 7)

    gameDataStore.setHiringArray(newHiringArray)
    gameDataStore.setMarketingArray(newMarketingArray)
    gameDataStore.setInvestmentArray(newInvestmentArray)
    gameDataStore.setProjectArray(newProjectArray)

    gameDataStore.setHiredPerson([])

    const randomSave = {
      ...newSave,
      hiringArray: newHiringArray,
      marketingArray: newMarketingArray,
      investmentArray: newInvestmentArray,
      projectArray: newProjectArray,
    }

    saveStore.setSave(idx, randomSave)
  }

  // 로그인 상태 확인
  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  // 새 게임
  const handleNewGame = () => {
    setIsNewGame(true);
    newGame();
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 시작 페이지 배경 */}
      <div className="absolute inset-0 flex w-[200%] h-full animate-scrollX">
        <img src={ loginPageBackgroundImage } alt="로그인 화면" className="w-1/2 h-full object-cover" />
        <img src={ loginPageBackgroundImage } alt="로그인 화면" className="w-1/2 h-full object-cover" />
      </div>
      
      {/* 템플릿 표시 */}
      {!isLoggedIn && !storeIsLoggedIn ? (
        <LoginTemplate onLogin={handleLogin} />
      ) : !isNewGame ? (
        <SelectSaveTemplate onIsNewGame={handleNewGame} />
      ) : (
        <DifficultyTemplate />
      )}
    </div>
  )
}

export default StartPage
