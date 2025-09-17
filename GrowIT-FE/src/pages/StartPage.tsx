// //isLoggedIn: 로컬 로그인 상태 (일반 로그인용)
// // isNewGame: 새 게임 시작 여부
// // storeIsLoggedIn: Zustand 스토어의 OAuth2 로그인 상태

// import { useState, useEffect } from "react"
// import LoginTemplate from "../components/templates_work/LoginTemplate"
// import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
// import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
// import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
// import { useButtonStore } from "../stores/buttonStore"
// import { useGameDataStore } from "../stores/gameDataStore"
// import { useUserStore } from "../stores/userStore"
// import { useSaveStore } from "../stores/saveStore"

// import type { Project } from "../stores/gameDataStore"

// const newSave = {
//   enterpriseValue: 1000,
//   productivity: 100,
//   finance: 1000000,
//   employeeCount: 0,
//   turn: 1,
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

// function getRandomUniqueArray(length: number, min: number, max: number): number[] {
//   const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min)
//   const result: number[] = []

//   for (let i = 0; i < length; i++) {
//     const idx = Math.floor(Math.random() * numbers.length)
//     result.push(numbers[idx])
//     numbers.splice(idx, 1)
//   }

//   return result
// }

// function StartPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [isNewGame, setIsNewGame] = useState(false)

//   const buttonStore = useButtonStore()
//   const gameDataState = useGameDataStore()
//   const { isLoggedIn: storeIsLoggedIn } = useUserStore()

//   // OAuth2 로그인 상태를 감지
//   useEffect(() => {
//     if (storeIsLoggedIn && !isLoggedIn) {
//       setIsLoggedIn(true);
//     }
//   }, [storeIsLoggedIn, isLoggedIn]);

//     buttonStore.setHiringButton1(true)
//     buttonStore.setHiringButton2(true)
//     buttonStore.setHiringButton3(true)
//     buttonStore.setMarketingButton(true)
//     buttonStore.setInvestmentButton(true)
//     buttonStore.setProjectButton(true)
    
//     gameDataStore.setEnterpriseValue(currentSave.enterpriseValue)
//     gameDataStore.setProductivity(currentSave.productivity)
//     gameDataStore.setFinance(currentSave.finance)
//     gameDataStore.setEmployeeCount(currentSave.employeeCount)
//     gameDataStore.setTurn(1)
//     gameDataStore.setCurrentProject(currentSave.currentProject)
//     gameDataStore.setOfficeLevel(currentSave.officeLevel)

//     const newHiringArray = getRandomUniqueArray(3, 0, 14)
//     const newMarketingArray = getRandomUniqueArray(3, 0, 4)
//     const newInvestmentArray = getRandomUniqueArray(2, 0, 14)
//     const newProjectArray = getRandomUniqueArray(3, 0, 7)

//     gameDataStore.setHiringArray(newHiringArray)
//     gameDataStore.setMarketingArray(newMarketingArray)
//     gameDataStore.setInvestmentArray(newInvestmentArray)
//     gameDataStore.setProjectArray(newProjectArray)

//     gameDataStore.setHiredPerson([])

//     const randomSave = {
//       ...newSave,
//       hiringArray: newHiringArray,
//       marketingArray: newMarketingArray,
//       investmentArray: newInvestmentArray,
//       projectArray: newProjectArray,
//     }

//     saveStore.setSave(idx, randomSave)
//   }

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   }

//   const handleNewGame = () => {
//     setIsNewGame(true);
//     // 게임 데이터 초기화
//     newGame();
//   }

//   return (
//     <>
//       <div className="relative w-screen h-screen overflow-hidden">
//         <div className="absolute inset-0 flex w-[200%] h-full animate-scrollX">
//           <img
//             src={ loginPageBackgroundImage }
//             alt="로그인 화면"
//             className="w-1/2 h-full object-cover"
//           />
//           <img
//             src={ loginPageBackgroundImage }
//             alt="로그인 화면"
//             className="w-1/2 h-full object-cover"
//           />
//         </div>
        
//         {!isLoggedIn && !storeIsLoggedIn ? (
//           <LoginTemplate onLogin={handleLogin} />
//         ) : !isNewGame ? (
//           <SelectSaveTemplate onIsNewGame={handleNewGame} />
//         ) : (
//           <DifficultyTemplate />
//         )}
//       </div>
//     </>
//   )
// }

// export default StartPage

import { useState, useEffect } from "react"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"
import { useUserStore } from "../stores/userStore"
import { useSaveStore } from "../stores/saveStore"

import type { Project } from "../stores/gameDataStore"

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

function getRandomUniqueArray(length: number, min: number, max: number): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  const result: number[] = []

  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * numbers.length)
    result.push(numbers[idx])
    numbers.splice(idx, 1)
  }

  return result
}

function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)

  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore() // Fixed: Added missing store
  const { isLoggedIn: storeIsLoggedIn } = useUserStore()
  const saveStore = useSaveStore() // Fixed: Added missing store

  // OAuth2 로그인 상태를 감지
  useEffect(() => {
    if (storeIsLoggedIn && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [storeIsLoggedIn, isLoggedIn]);

  // Fixed: Moved newGame logic into a proper function
  const newGame = (idx: number = 0) => {
    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)
    
    gameDataStore.setEnterpriseValue(newSave.enterpriseValue) // Fixed: Use newSave instead of undefined currentSave
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleNewGame = () => {
    setIsNewGame(true);
    // 게임 데이터 초기화
    newGame(); // Fixed: Now properly calls the function
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
        
        {!isLoggedIn && !storeIsLoggedIn ? (
          <LoginTemplate onLogin={handleLogin} />
        ) : !isNewGame ? (
          <SelectSaveTemplate onIsNewGame={handleNewGame} />
        ) : (
          <DifficultyTemplate />
        )}
      </div>
    </>
  )
}

export default StartPage
