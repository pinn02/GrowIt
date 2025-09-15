import { useState } from "react"
import InformationBar from "../components/organisms/InformationBar"
import MainTemplate from "../components/templates_work/MainTemplate"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"
import MypageModal from "../components/organisms/MypageModal"
import RandomEventModal from "../components/organisms/RandomEventModal"
import StoreModal from "../components/organisms/StoreModal"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeRandomEventModal, setActiveRandomEventModal] = useState(false)
  const [activeStoreModal, setActiveStoreModal] = useState(false)

  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  const handleRandomEventModal = () => {
    setActiveRandomEventModal(true)
  }

  const handleStoreModal = () => {
    setActiveStoreModal(true)
  }

  return (
    <>
      <InformationBar onRandomEvent={handleRandomEventModal} onStore={handleStoreModal} />
      <MainTemplate openModal={toggleModal} />

      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}
      {activeModal === 4 && <MypageModal onClose={() => setActiveModal(null)} />}

      {activeRandomEventModal && <RandomEventModal onClose={() => setActiveRandomEventModal(false)} />}
      {activeStoreModal && <StoreModal onClose={() => setActiveStoreModal(false)} />}
    </>
  )
}

export default MainPage