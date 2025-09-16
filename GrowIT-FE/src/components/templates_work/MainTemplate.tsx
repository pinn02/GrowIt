import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage1 from "../../assets/background_images/office_level_1.gif"
import mainPageBackgroundImage2 from "../../assets/background_images/office_level_2.gif"
import mainPageBackgroundImage3 from "../../assets/background_images/office_level_3.gif"
import mainPageBackgroundImage4 from "../../assets/background_images/office_level_4.gif"
import { useGameDataStore } from "../../stores/gameDataStore"

const backgroundImages = [
  mainPageBackgroundImage1, // 레벨 0
  mainPageBackgroundImage2, // 레벨 1
  mainPageBackgroundImage3, // 레벨 2
  mainPageBackgroundImage4, // 레벨 3
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
        alt={`메인 페이지 - 사무실 레벨 ${gameDataStore.officeLevel}`}
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