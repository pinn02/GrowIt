// 로그아웃 버튼: 로컬이나 세션에서 토큰 삭제
// 회원탈퇴 버튼: 카카오 자동 연결 해제 api는 아니므로 수동 해제하도록 안내 (카카오 연결 화면으로 이동)
import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import StoreButton from "../atoms/Button"
import TurnEndButton from "../atoms/Button"
import ReportModal from "./ReportModal"
import { useGameDataStore } from '../../stores/gameDataStore'
import { useButtonStore } from '../../stores/buttonStore'
import { useUserStore } from '../../stores/userStore'
import { authApi } from '../../api/authApi'
import { useSaveStore } from '../../stores/saveStore'
import { useNavigate } from 'react-router-dom'

const logoHeight = 48;
const storeButtonSize = 100;
const turnEndButtonSize = 100;
const logoutButtonSize = 100;

const RANDOM_EVENT_PROBABILITY = 0.25
const MAX_TURN = 3

const defaultSave = {
  enterpriseValue: 1000,
  productivity: 100,
  finance: 1000000,
  employeeCount: 0,
  turn: 0,
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

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
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

function getRandomHiringArray(hiredPerson: number[], length: number, min: number, max: number): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const result: number[] = [];

  hiredPerson.forEach((hp) => {
    const index = numbers.indexOf(hp);
    if (index !== -1) numbers.splice(index, 1);
  });

  for (let i = 0; i < 3; i++) {
    if (numbers.length === 0) break;
    const idx = Math.floor(Math.random() * numbers.length);
    result.push(numbers[idx]);
    numbers.splice(idx, 1);
  }

  return result;
}


function InformationBar({ onRandomEvent, onStore }: InformationBarProps) {
  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const gameDataStore = useGameDataStore()
  const buttonStore = useButtonStore()
  const { isLoggedIn, user, clearUser } = useUserStore()

  const currentSaveIdx = saveStore.currentSaveIdx

  const [showReportModal, setShowReportModal] = useState(false)

  const handleTurnEnd = () => {
    const projectNextTurn = gameDataStore.currentProject.turn - 1

    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)

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

    gameDataStore.setHiringArray(getRandomHiringArray(gameDataStore.hiringArray, 3, 0, 14))
    gameDataStore.setMarketingArray(getRandomUniqueArray(3, 0, 4))
    gameDataStore.setInvestmentArray(getRandomUniqueArray(2, 0, 14))
    gameDataStore.setProjectArray(getRandomUniqueArray(3, 0, 7))

    const latestData = {
      enterpriseValue: gameDataStore.enterpriseValue,
      productivity: gameDataStore.productivity,
      finance: gameDataStore.finance,
      employeeCount: gameDataStore.employeeCount,
      turn: gameDataStore.turn + 1,
      currentProject: gameDataStore.currentProject,
      officeLevel: gameDataStore.officeLevel,
      updatedAt: new Date().toISOString().split("T")[0],

      hiringArray: gameDataStore.hiringArray,
      marketingArray: gameDataStore.marketingArray,
      investmentArray: gameDataStore.investmentArray,
      projectArray: gameDataStore.projectArray,
      
      hiredPerson: gameDataStore.hiredPerson,
    }

    
    if (gameDataStore.turn === MAX_TURN) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/ending")
    } else {
      gameDataStore.setTurn(gameDataStore.turn + 1)
      saveStore.setSave(currentSaveIdx, latestData)
      setShowReportModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowReportModal(false)
    const randomEventProbability = Math.random()
    if (randomEventProbability < RANDOM_EVENT_PROBABILITY) {
      onRandomEvent()
    }
  }

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
        <Logo height={logoHeight} />
        <div className="flex items-center space-x-4">
          <GameDataInformation />
          <div className='flex items-center gap-2'>
            <StoreButton
              maxSize={storeButtonSize}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors"
              onClick={onStore}
            >
              스토어
            </StoreButton>
            <TurnEndButton
              maxSize={turnEndButtonSize}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
              onClick={handleTurnEnd}
            >
              턴 종료
            </TurnEndButton>
            
            {/* 로그인 상태일 때만 로그아웃/회원탈퇴 버튼 표시 */}
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <TurnEndButton
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-red-500 text-red-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  로그아웃
                </TurnEndButton>
                <TurnEndButton
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-700 hover:text-white transition-colors"
                  onClick={handleWithdraw}
                >
                  회원탈퇴
                </TurnEndButton>
              </div>
            )}
          </div>
        </div>
      </header>

      {showReportModal && (<ReportModal onClose={handleCloseModal} />)}
    </>
  )
}

export default InformationBar