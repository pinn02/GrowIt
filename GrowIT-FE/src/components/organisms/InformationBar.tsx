import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import TurnEndButton from "../atoms/Button"
import ReportButton from "../atoms/Button"

const logoHeight = 48;
const turnEndButtonSize = 100;
const reportButtonSize = 100;

function InformationBar() {
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
            onClick={() => console.log('턴 종료')}
          >
            턴 종료
          </TurnEndButton>
        </div>
      </header>
    </>
  )
}

export default InformationBar