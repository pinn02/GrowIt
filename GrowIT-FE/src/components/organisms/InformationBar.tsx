import { useState } from 'react'
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import TurnEndButton from "../atoms/Button"
import ReportButton from "../atoms/Button"
import ReportModal from "./ReportModal"

const logoHeight = 48;
const turnEndButtonSize = 100;
const reportButtonSize = 100;

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
      <header className="bg-gray-400 h-16 flex items-center justify-between">
        <Logo height={logoHeight} />
        <div className="flex items-center">
          <GameDataInformation />
          <ReportButton
            maxSize={reportButtonSize}
            className="bg-green-300 text-black px-2 py-2 rounded hover:bg-green-400 transition-colors mx-2"
            to="/report"
          >
            리포트
          </ReportButton>
          <TurnEndButton
            maxSize={turnEndButtonSize}
            className="bg-blue-300 text-black px-2 py-2 rounded hover:bg-blue-400 transition-colors mx-2"
            onClick={handleTurnEnd}
          >
            턴 종료
          </TurnEndButton>
        </div>
      </header>

      {/* showReportModal이 true일 때만  ReportModal가 렌더링 되도록 */}
      {showReportModal && (<ReportModal onClose={handleCloseModal} />)}
    </>
  )
}

export default InformationBar