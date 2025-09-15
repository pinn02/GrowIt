import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage1 from "../../assets/background_images/1.png"
import mainPageBackgroundImage2 from "../../assets/background_images/upgrade_office.png"
import { useGameDataStore } from "../../stores/gameDataStore"

const backgroundImages = [
  mainPageBackgroundImage1,
  mainPageBackgroundImage2,
]

type MainTemplateProps = {
  openModal: (index: number) => void;
}

function MainTemplate({ openModal }: MainTemplateProps) {
  const gameDataStore = useGameDataStore()

  return (
    <>
      <img
        src={ backgroundImages[gameDataStore.officeLevel] }
        alt="메인 페이지"
        className="absolute z-0 w-screen object-cover overflow-hidden h-[calc(100vh-64px)]"
      />
      <div className="text-center relative h-[calc(100vh-64px)] z-10">
        <div>
          <ActionButtonBundle openModal={openModal} />
        </div>
      </div>
    </>
  )
}

export default MainTemplate