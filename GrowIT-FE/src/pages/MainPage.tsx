import { useState } from "react"
import InformationBar from "../components/organisms/InformationBar"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"
import MypageModal from "../components/organisms/MypageModal"
import RandomEventModal from "../components/organisms/RandomEventModal"
import StoreModal from "../components/organisms/StoreModal"
// import ReportModal from "../components/organisms/ReportModal"
import MainTemplate from "../components/templates_work/MainTemplate"
// import { useGameDataStore } from "../stores/gameDataStore"
// import hintIcon from "../assets/icons/hint.png"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeRandomEventModal, setActiveRandomEventModal] = useState(false)
  const [activeStoreModal, setActiveStoreModal] = useState(false)
  const [showTurnTransition, setShowTurnTransition] = useState(false)
  // const [activeReportModal, setActiveReportModal] = useState(false)

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

  // 리포트 모달
  // const handleReportModal = () => {
  //   setActiveReportModal(true)
  // }

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
        onEventComplete={() => setShowTurnTransition(false)}
      />
      <MainTemplate openModal={toggleModal} />

      {/* 모달 켜기 */}
      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}
      {activeModal === 4 && <MypageModal onClose={() => setActiveModal(null)} />}

      {activeRandomEventModal && <RandomEventModal onClose={handleEventComplete} />}
      {activeStoreModal && <StoreModal onClose={() => setActiveStoreModal(false)} />}
      {/* {activeReportModal && <ReportModal onClose={() => setActiveReportModal(false)} />} */}

      {/* 우측 하단 리포트 버튼 */}
      {/* <button
        onClick={handleReportModal}
        className="fixed bottom-6 right-6 w-32 h-32 transition-all duration-200 hover:scale-110 z-40 flex items-center justify-center"
        title="경제 리포트 보기"
      >
        <img 
          src={hintIcon} 
          alt="리포트" 
          className="w-28 h-28"
        />
      </button> */}
    </>
  )
}

export default MainPage