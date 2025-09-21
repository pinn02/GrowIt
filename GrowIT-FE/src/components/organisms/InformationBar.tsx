import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { useUserStore } from '../../stores/userStore'
import { useSaveStore } from '../../stores/saveStore'
import { useButtonStore } from '../../stores/buttonStore'
import { useGameDataStore } from '../../stores/gameDataStore'
import { defaultSave } from '../../stores/saveStore'
import { getRandomHiringArray, getRandomUniqueArray } from '../../hooks/CreateRandomArray'  // 랜덤 배열 함수
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import Button from "../atoms/Button"


const logoHeight = 48;  // 로고 이미지 세로 사이즈
const storeButtonSize = 100;  // 스토어 버튼 최대 사이즈
const turnEndButtonSize = 100;  // 턴 종료 버튼 최대 사이즈
const logoutButtonSize = 100; // 로그아웃 버튼 사이즈

const RANDOM_EVENT_PROBABILITY = 0.25 // 랜덤 이벤트 확률
const MAX_TURN = 3  // 게임의 종료 턴

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
}

// 정보 바
function InformationBar({ onRandomEvent, onStore }: InformationBarProps) {
  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const { isLoggedIn, user: _user, clearUser } = useUserStore()
  const currentSaveIdx = saveStore.currentSaveIdx

  // 턴 종료 버튼 누를 시 이벤트
  const handleTurnEnd = () => {
    const projectNextTurn = gameDataStore.currentProject.turn - 1 // 프로젝트 턴 수 1 감소

    // 프로젝트 완료 시
    if (projectNextTurn === 0) {
      gameDataStore.setFinance(gameDataStore.finance + gameDataStore.currentProject.reward)
      const newProject = {
        name: "",
        turn: 0,
        reward: 0,
      }
      gameDataStore.setCurrentProject(newProject)
      buttonStore.setProjectButton(true)
    } else {
      const newProject = {
        name: gameDataStore.currentProject.name,
        turn: gameDataStore.currentProject.turn - 1,
        reward: gameDataStore.currentProject.reward
      }
      gameDataStore.setCurrentProject(newProject)
    }

    // 버튼 선택 여부 초기화
    buttonStore.setHiringButton(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)

    // 각 액션 데이터 랜덤하게 변경
    gameDataStore.setHiringArray(getRandomHiringArray(gameDataStore.hiringArray, 0, 14))
    gameDataStore.setMarketingArray(getRandomUniqueArray(3, 0, 4))
    gameDataStore.setInvestmentArray(getRandomUniqueArray(2, 0, 14))
    gameDataStore.setProjectArray(getRandomUniqueArray(3, 0, 7))

    // gameDataStore 갱신
    const latestData = {
      enterpriseValue: gameDataStore.enterpriseValue,
      productivity: gameDataStore.productivity,
      finance: gameDataStore.finance,
      employeeCount: gameDataStore.employeeCount,
      turn: gameDataStore.turn + 1,
      currentProject: gameDataStore.currentProject,
      officeLevel: gameDataStore.officeLevel,
      // 업그레이드 레벨들 추가
      commuteBusLevel: gameDataStore.commuteBusLevel,
      dormitoryLevel: gameDataStore.dormitoryLevel,
      gymLevel: gameDataStore.gymLevel,
      cafeteriaLevel: gameDataStore.cafeteriaLevel,
      hospitalLevel: gameDataStore.hospitalLevel,
      daycareLevel: gameDataStore.daycareLevel,
      bookCafeLevel: gameDataStore.bookCafeLevel,
      buildingLevel: gameDataStore.buildingLevel,
      updatedAt: new Date().toISOString().split("T")[0],
      hiringArray: gameDataStore.hiringArray,
      marketingArray: gameDataStore.marketingArray,
      investmentArray: gameDataStore.investmentArray,
      projectArray: gameDataStore.projectArray,
      hiredPerson: gameDataStore.hiredPerson,
    }
    
    // 종료 턴 도달 시
    if (gameDataStore.turn === MAX_TURN) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/ending")
      return
    } else {
      gameDataStore.setTurn(gameDataStore.turn + 1)
      console.log('턴 종료 전 데이터:', {
        buildingLevel: gameDataStore.buildingLevel,
        officeLevel: gameDataStore.officeLevel
      });
      console.log('저장할 latestData:', latestData);
      saveStore.setSave(currentSaveIdx, latestData)
      console.log('턴 종료 후 저장 완료');
      
      // 랜덤 이벤트 발생 확률 체크
      const randomEventProbability = Math.random()
      if (randomEventProbability < RANDOM_EVENT_PROBABILITY) onRandomEvent()
    }
  }


  // 로그아웃 기능
  const handleLogout = async () => {
    try {
      await authApi.logout()
      clearUser()
      localStorage.removeItem('growit-auth-data')
      localStorage.removeItem('growit-user-storage')
      
      alert('로그아웃 되었습니다.')
      window.location.href = '/' 
    } catch (error) {
      console.error('로그아웃 오류:', error)
      clearUser()
      localStorage.removeItem('growit-auth-data')
      localStorage.removeItem('growit-user-storage')
      alert('로그아웃 되었습니다.')
      window.location.href = '/'
    }
  }

  // 회원탈퇴 기능
  const handleWithdraw = async () => {
    const confirmWithdraw = confirm('정말 회원탈퇴하시겠습니까?')
    if (!confirmWithdraw) return
    try {
      await authApi.withdraw()
      clearUser()
      localStorage.clear()
      alert('회원탈퇴가 완료되었습니다.')
      window.location.href = '/'
    } catch (error) {
      console.error('회원탈퇴 오류:', error)
      clearUser()
      localStorage.clear()
      alert('회원탈퇴 처리 중 오류가 발생했지만, 로컬 데이터는 삭제되었습니다.')
      window.location.href = '/'
    }
  }

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 bg-cover bg-center bg-zinc-300">
        {/* 로고 이미지 */}
        <Logo height={logoHeight} />

        <div className="flex items-center space-x-4">
          {/* 게임 데이터 표시 */}
          <GameDataInformation MAX_TURN={MAX_TURN} />
          {/* 스토어, 턴 종료, 로그아웃, 회원탈퇴 버튼 */}
          <div className='flex items-center gap-2'>
            {/* 스토어 버튼 */}
            <Button
              maxSize={storeButtonSize}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors"
              onClick={onStore}
            >
              스토어
            </Button>
            {/* 턴 종료 버튼 */}
            <Button
              maxSize={turnEndButtonSize}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
              onClick={handleTurnEnd}
            >
              턴 종료
            </Button>
            {/* 로그인 상태일 때만 로그아웃/회원탈퇴 버튼 표시 */}
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <Button
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-red-500 text-red-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
                <Button
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-700 hover:text-white transition-colors"
                  onClick={handleWithdraw}
                >
                  회원탈퇴
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default InformationBar