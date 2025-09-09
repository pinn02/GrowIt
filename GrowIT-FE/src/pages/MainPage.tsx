import { useState } from "react"
import InformationBar from "../components/organisms/InformationBar"
import MainTemplate from "../components/templates_work/MainTemplate"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  return (
    <>
      {/* <button onClick={() => toggleModal(0)}>고용 모달</button>
      <button onClick={() => toggleModal(1)}>마케팅 모달</button>
      <button onClick={() => toggleModal(2)}>투자 모달</button>
      <button onClick={() => toggleModal(3)}>프로젝트 모달</button> */}

      <InformationBar />
      <MainTemplate openModal={toggleModal} />

      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}
    </>
  )
}

export default MainPage