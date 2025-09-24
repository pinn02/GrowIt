import { useState, useEffect } from "react"
import { useButtonStore } from "../stores/buttonStore"
import { useGameDataStore } from "../stores/gameDataStore"
import { useUserStore } from "../stores/userStore"
import { useSaveStore } from "../stores/saveStore"
import { getRandomUniqueArray } from "../hooks/CreateRandomArray"
import LoginTemplate from "../components/templates_work/LoginTemplate"
import SelectSaveTemplate from "../components/templates_work/SelectSaveTemplate"
import DifficultyTemplate from "../components/templates_work/DifficultyTemplate"
import CeoSelectTemplate from "../components/templates_work/CeoSelectTemplate"
import loginPageBackgroundImage from "../assets/background_images/start_page_background_image.png"
import { defaultSave } from "../stores/saveStore"
import { getKakaoToken, getKakaoUserInfo } from "../config/kakaoConfig.js"

// 시작 페이지
function StartPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isNewGame, setIsNewGame] = useState(false)
  const [currentStep, setCurrentStep] = useState<'ceo' | 'difficulty'>('ceo')

  const saveStore = useSaveStore()
  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const { isLoggedIn: storeIsLoggedIn, setUser, setToken, setIsLoggedIn: setStoreIsLoggedIn } = useUserStore()

  // 카카오 로그인 콜백 처리 (프론트엔드에서 완전 처리)
  useEffect(() => {
    const handleKakaoCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');
      const error = urlParams.get('error');

      // 카카오 로그인 에러 처리
      if (error) {
        console.error('카카오 로그인 에러:', error);
        alert('카카오 로그인에 실패했습니다.');
        return;
      }

      // Authorization code가 있으면 카카오 로그인 처리
      if (authCode && !storeIsLoggedIn) {
        try {
          // 1. 카카오에서 액세스 토큰 받기
          const tokenData = await getKakaoToken(authCode);

          // 2. 액세스 토큰으로 사용자 정보 가져오기
          const userInfo = await getKakaoUserInfo(tokenData.access_token);

          // 3. 사용자 정보 저장
          const userData = {
            email: userInfo.kakao_account?.email || `kakao_${userInfo.id}`,
            nickname: userInfo.properties?.nickname || '카카오 사용자'
          };

          // 4. Zustand store에 저장
          setUser(userData);
          setToken(tokenData.access_token);
          setStoreIsLoggedIn(true);

          // 5. URL에서 파라미터 제거
          window.history.replaceState({}, document.title, window.location.pathname);

          console.log('카카오 로그인 성공:', userData);
          alert(`${userData.nickname}님, 환영합니다!`);

        } catch (error) {
          console.error('카카오 로그인 처리 실패:', error);
          alert('로그인 처리 중 오류가 발생했습니다.');

          // URL에서 파라미터 제거
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleKakaoCallback();
  }, [storeIsLoggedIn, setUser, setToken, setStoreIsLoggedIn]);

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
    
    gameDataStore.setEnterpriseValue(defaultSave.enterpriseValue)
    gameDataStore.setProductivity(defaultSave.productivity)
    gameDataStore.setFinance(defaultSave.finance)
    gameDataStore.setEmployeeCount(defaultSave.employeeCount)
    gameDataStore.setTurn(1)
    gameDataStore.setCurrentProject(defaultSave.currentProject)
    gameDataStore.setOfficeLevel(defaultSave.officeLevel)

    // 업그레이드 레벨 초기화
    gameDataStore.setCommuteBusLevel(1)
    gameDataStore.setDormitoryLevel(1)
    gameDataStore.setGymLevel(1)
    gameDataStore.setCafeteriaLevel(1)
    gameDataStore.setHospitalLevel(1)
    gameDataStore.setDaycareLevel(1)
    gameDataStore.setBookCafeLevel(1)
    gameDataStore.setBuildingLevel(1)

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
      ...defaultSave,
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
  const handleNewGame = (idx: number = 0) => {
    setIsNewGame(true);
    setCurrentStep('ceo');
    newGame(idx);
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
      ) : currentStep === 'ceo' ? (
        <CeoSelectTemplate onCeoSelect={() => setCurrentStep('difficulty')} />
      ) : (
        <DifficultyTemplate />
      )}
    </div>
  )
}

export default StartPage
