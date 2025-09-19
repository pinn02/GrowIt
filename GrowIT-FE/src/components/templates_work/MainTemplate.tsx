import { useGameDataStore } from "../../stores/gameDataStore"
import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage1 from "../../assets/background_images/office_level_1.gif"
import mainPageBackgroundImage2 from "../../assets/background_images/office_level_2.gif"
import mainPageBackgroundImage3 from "../../assets/background_images/office_level_3.gif"
import mainPageBackgroundImage4 from "../../assets/background_images/office_level_4.gif"

// 레벨에 따른 배경 이미지 배열
const backgroundImages = [
  mainPageBackgroundImage1, // 레벨 0
  mainPageBackgroundImage2, // 레벨 1
  mainPageBackgroundImage3, // 레벨 2
  mainPageBackgroundImage4, // 레벨 3
]

type MainTemplateProps = {
  openModal: (index: number) => void;
}

// 메인 화면 템플릿
function MainTemplate({ openModal }: MainTemplateProps) {
  const gameDataStore = useGameDataStore()

  return (
    <>
      {/* 메인 페이지 배경 */}
      <img
        src={ backgroundImages[gameDataStore.officeLevel] }
        alt={`메인 페이지 - 사무실 레벨 ${gameDataStore.officeLevel}`}
        className="absolute z-0 w-screen object-cover overflow-hidden h-[calc(100vh-64px)]"
      />
      {/* 액션 버튼 번들 표시 */}
      <div className="text-center relative h-[calc(100vh-64px)] z-10">
        <div>
          <ActionButtonBundle openModal={openModal} />
        </div>
      </div>
    </>
  )
}

export default MainTemplate