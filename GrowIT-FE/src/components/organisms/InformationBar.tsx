import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import StoreButton from "../atoms/Button"
import TurnEndButton from "../atoms/Button"
import ReportModal from "./ReportModal"
import skyBackgroundImage from "../../assets/background_images/sky_page_background_image.png"
import { useGameDataStore } from '../../stores/gameDataStore'
import { useButtonStore } from '../../stores/buttonStore'
import { useSaveStore } from '../../stores/saveStore'

const logoHeight = 48;
const storeButtonSize = 100;
const turnEndButtonSize = 100;

const RANDOM_EVENT_PROBABILITY = 0.25

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
}

function InformationBar({ onRandomEvent, onStore }: InformationBarProps) {
  const saveStore = useSaveStore()
  const gameDataStore = useGameDataStore()
  const buttonStore = useButtonStore()

  const currentSaveIdx = saveStore.currentSaveIdx

  const [showReportModal, setShowReportModal] = useState(false)

  const handleTurnEnd = () => {
    buttonStore.setHiringButton1(true)
    buttonStore.setHiringButton2(true)
    buttonStore.setHiringButton3(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)
    buttonStore.setProjectButton(true)

    
    const latestData = {
      enterpriseValue: gameDataStore.enterpriseValue,
      productivity: gameDataStore.productivity,
      finance: gameDataStore.finance,
      employeeCount: gameDataStore.employeeCount,
      turn: gameDataStore.turn + 1,
      currentProject: gameDataStore.currentProject,
      officeLevel: gameDataStore.officeLevel,
      updatedAt: new Date().toISOString().split("T")[0],
    }

    gameDataStore.setTurn(gameDataStore.turn + 1)

    saveStore.setSave(currentSaveIdx, latestData)

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