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
import MainTemplate from "../components/templates_work/MainTemplate"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeRandomEventModal, setActiveRandomEventModal] = useState(false)
  const [activeStoreModal, setActiveStoreModal] = useState(false)
  const [showTurnTransition, setShowTurnTransition] = useState(false)

  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const finance = useGameDataStore(state => state.finance)
  const currentSaveIdx = saveStore.currentSaveIdx

  // 파산 기능
  useEffect(() => {
    if (finance < 0) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/bankruptcy")
    }
  }, [finance, navigate])

  // 액션 버튼 모달
  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  // 랜덤 이벤트 모달
  const handleRandomEventModal = () => {
    setActiveRandomEventModal(true)
  }

  // 이벤트 완료 후 턴 전환 애니메이션 표시
  const handleEventComplete = () => {
    setActiveRandomEventModal(false)
    setShowTurnTransition(true)
    setTimeout(() => {
      setShowTurnTransition(false)
    }, 1500)
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
    </>
  )
}

export default MainPage