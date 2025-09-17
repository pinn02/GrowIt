// 로그아웃 버튼: 로컬이나 세션에서 토큰 삭제
// 회원탈퇴 버튼: 카카오 자동 연결 해제 api는 아니므로 수동 해제하도록 안내 (카카오 연결 화면으로 이동)
import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import StoreButton from "../atoms/Button"
import TurnEndButton from "../atoms/Button"
import ReportModal from "./ReportModal"
import skyBackgroundImage from "../../assets/background_images/sky_page_background_image.png"
import { useGameDataStore } from '../../stores/gameDataStore'
import { useButtonStore } from '../../stores/buttonStore'
import { useUserStore } from '../../stores/userStore'
import { authApi } from '../../api/authApi'

const logoHeight = 48;
const storeButtonSize = 100;
const turnEndButtonSize = 100;
const logoutButtonSize = 100;

const RANDOM_EVENT_PROBABILITY = 0.25

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
}

function InformationBar({ onRandomEvent, onStore }: InformationBarProps) {
  const gameDataStore = useGameDataStore()
  const buttonStore = useButtonStore()
  const { isLoggedIn, user, clearUser } = useUserStore()

  const [showReportModal, setShowReportModal] = useState(false)

  const handleTurnEnd = () => {
    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)

    gameDataStore.setTurn(gameDataStore.turn + 1)

    setShowReportModal(true)
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
      <header
        className="h-16 flex items-center justify-between px-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${skyBackgroundImage})` }}
      >
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
                <span className="text-white text-sm">
                  {user?.email}님
                </span>
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