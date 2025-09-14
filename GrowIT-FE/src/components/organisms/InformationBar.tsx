import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import TurnEndButton from "../atoms/Button"
import ReportModal from "./ReportModal"
import skyBackgroundImage from "../../assets/background_images/sky_page_background_image.png"

const logoHeight = 48;
const turnEndButtonSize = 100;

function InformationBar() {
  const [showReportModal, setShowReportModal] = useState(false)

  const handleTurnEnd = () => {
    setShowReportModal(true)
  }

  const handleCloseModal = () => {
   setShowReportModal(false)
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
        <TurnEndButton
          maxSize={turnEndButtonSize}
          className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
          onClick={handleTurnEnd}
        >
            턴 종료
          </TurnEndButton>
        </div>
      </header>

      {showReportModal && (<ReportModal onClose={handleCloseModal} />)}
    </>
  )
}

export default InformationBar