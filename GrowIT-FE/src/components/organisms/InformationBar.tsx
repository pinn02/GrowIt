import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"

const logoHeight = 48;

function InformationBar() {
  return (
    <>
      <header className="bg-gray-400 h-16 flex items-center justify-between">
        <Logo height={logoHeight} />
        <GameDataInformation />
      </header>
    </>
  )
}

export default InformationBar