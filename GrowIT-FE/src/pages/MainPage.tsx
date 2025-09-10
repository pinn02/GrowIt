import { useState } from "react"
import InformationBar from "../components/organisms/InformationBar"
import MainTemplate from "../components/templates_work/MainTemplate"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"
import MypageModal from "../components/organisms/MypageModal"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  return (
    <>
      <InformationBar />
      <MainTemplate openModal={toggleModal} />

      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}
      {activeModal === 4 && <MypageModal onClose={() => setActiveModal(null)} />}
    </>
  )
}

export default MainPage