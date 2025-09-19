import { useState, useEffect } from "react"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"
import { useUserStore } from "../stores/userStore"
import { newGame } from "../apis/saveApi"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
import CompanyNameModal from "../components/organisms/CompanyNameModal"

// 시작 페이지
function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)
  const [hasCompanyName, setHasCompanyName] = useState(false)

  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const { isLoggedIn: storeIsLoggedIn } = useUserStore()

  // OAuth2 로그인 상태를 감지
  useEffect(() => {
    if (storeIsLoggedIn && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [storeIsLoggedIn, isLoggedIn]);

    // 로그인 상태 확인
    const handleLogin = () => {
      setIsLoggedIn(true);
    }

    // 새 게임
    const handleNewGame = () => {
      setIsNewGame(true);
    }
    
    // 회사 이름 선정
    const handleCompanyName = (name: string) => {
      newGame(name)
      setHasCompanyName(true)
      buttonStore.setHiringButton(true)
      buttonStore.setMarketingButton(true)
      buttonStore.setInvestmentButton(true)
      buttonStore.setProjectButton(true)
  }


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 시작 페이지 배경 */}
      <div className="absolute inset-0 flex w-[200%] h-full animate-scrollX">
        <img src={ loginPageBackgroundImage } alt="로그인 화면" className="w-1/2 h-full object-cover" />
        <img src={ loginPageBackgroundImage } alt="로그인 화면" className="w-1/2 h-full object-cover" />
      </div>
      
      {/* 템플릿 표시 */}
      {!isLoggedIn && !storeIsLoggedIn && (
        <LoginTemplate onLogin={handleLogin} />
      )}

      {isLoggedIn && storeIsLoggedIn && !isNewGame && (
        <SelectSaveTemplate onIsNewGame={handleNewGame} />
      )}

      {isLoggedIn && storeIsLoggedIn && isNewGame && (
        !hasCompanyName
          ? <CompanyNameModal onSubmit={handleCompanyName} />
          : <DifficultyTemplate />
      )}
    </div>
  )
}

export default StartPage
