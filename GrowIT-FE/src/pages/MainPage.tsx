import { useState } from "react"
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

  // 액션 버튼 모달
  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  // 랜덤 이벤트 모달
  const handleRandomEventModal = () => {
    setActiveRandomEventModal(true)
  }

  // 스토어 모달
  const handleStoreModal = () => {
    setActiveStoreModal(true)
  }

  return (
    <>
      <InformationBar onRandomEvent={handleRandomEventModal} onStore={handleStoreModal} />
      <MainTemplate openModal={toggleModal} />

      {/* 모달 켜기 */}
      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}

      {activeRandomEventModal && <RandomEventModal onClose={() => setActiveRandomEventModal(false)} />}
      {activeStoreModal && <StoreModal onClose={() => setActiveStoreModal(false)} />}
    </>
  )
}

export default MainPage