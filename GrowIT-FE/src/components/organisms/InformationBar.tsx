import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import StoreButton from "../atoms/Button"
import TurnEndButton from "../atoms/Button"
import ReportModal from "./ReportModal"
import skyBackgroundImage from "../../assets/background_images/sky_page_background_image.png"

const logoHeight = 48;
const storeButtonSize = 100;
const turnEndButtonSize = 100;

const RANDOM_EVENT_PROBABILITY = 0.5

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
}

function InformationBar({ onRandomEvent, onStore }: InformationBarProps) {
  const [showReportModal, setShowReportModal] = useState(false)

  const handleTurnEnd = () => {
    setShowReportModal(true)
  }

  const handleCloseModal = () => {
   setShowReportModal(false)

   const randomEventProbability = Math.random()
   if (randomEventProbability < RANDOM_EVENT_PROBABILITY) {
     onRandomEvent()
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
          </div>
        </div>
      </header>

      {showReportModal && (<ReportModal onClose={handleCloseModal} />)}
    </>
  )
}

export default InformationBar