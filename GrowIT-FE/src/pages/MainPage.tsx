import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGameDataStore } from "../stores/gameDataStore"
import { defaultSave, useSaveStore } from "../stores/saveStore"
import InformationBar from "../components/organisms/InformationBar"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"
import RandomEventModal from "../components/organisms/RandomEventModal"
import StoreModal from "../components/organisms/StoreModal"
import StoryModal from "../components/organisms/StoryModal"
import MainTemplate from "../components/templates_work/MainTemplate"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeRandomEventModal, setActiveRandomEventModal] = useState(false)
  const [activeStoreModal, setActiveStoreModal] = useState(false)
  const [showTurnTransition, setShowTurnTransition] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)

  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const finance = useGameDataStore(state => state.finance)
  const currentSaveIdx = saveStore.currentSaveIdx
  const gameDataStore = useGameDataStore()

  // 스토리 모달 기능 - 세션 저장소 대신 게임 상태 기반으로 바꿈
  useEffect(() => {
    // 첫 번째 턴에서 스토리 모달을 보여준다
    if (gameDataStore.turn === 1) {
      setShowStoryModal(true)
    }
  }, [gameDataStore.turn])

  // 파산 기능
  useEffect(() => {
    if (finance < 0) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/bankruptcy")
    }
  }, [finance, navigate])

  // 스토리 모달 닫기 - sessionStorage 사용 제거
  const handleStoryClose = () => {
    setShowStoryModal(false)
  }

  // 액션 버튼 모달
  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  // 랜덤 이벤트 모달
  const handleRandomEventModal = () => {
    setActiveRandomEventModal(true)
  }

  // 모든 모달을 닫는 함수 (턴 종료 시 사용)
  const handleCloseAllModals = () => {
    // 모든 모달 상태를 false로 설정
    setActiveModal(null)
    setActiveRandomEventModal(false)
    setActiveStoreModal(false)
    setShowStoryModal(false)
    console.log('턴 종료에 의해 모든 모달 자동 닫힘')
  }

  // 이벤트 완료 후 로딩창 없이 바로 종료
  const handleEventComplete = () => {
    setActiveRandomEventModal(false)
    // 로딩창 제거 - 기사 확인 완료 후에는 로딩 화면 안보이게
  }

  // 스토어 모달
  const handleStoreModal = () => {
    setActiveStoreModal(true)
  }

  return (
    <>
      {/* 새턴 시작 오버레이 */}
      {showTurnTransition && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-90" />
          
          {/* 턴 전환 텍스트 */}
          <div className="relative z-10 text-center animate-turnTransition">
             <div className="text-4xl font-bold text-white mb-4 animate-pulse">
              GrowIT
            </div>
            
            {/* ... 장식 효과 */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      <InformationBar 
        onRandomEvent={handleRandomEventModal} 
        onStore={handleStoreModal}
        onCloseAllModals={handleCloseAllModals}
        // onEventComplete={() => setShowTurnTransition(false)}
      />
      <MainTemplate openModal={toggleModal} />

      {/* 모달 켜기 */}
      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}

      {activeRandomEventModal && <RandomEventModal onClose={handleEventComplete} />}
      {activeStoreModal && <StoreModal onClose={() => setActiveStoreModal(false)} />}
      {showStoryModal && <StoryModal onClose={handleStoryClose} />}
    </>
  )
}

export default MainPage