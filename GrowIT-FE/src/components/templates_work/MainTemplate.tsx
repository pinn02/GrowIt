import { useGameDataStore } from "../../stores/gameDataStore"
import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage1 from "../../assets/background_images/office_level_1.gif"
import mainPageBackgroundImage2 from "../../assets/background_images/office_level_2.gif"
import mainPageBackgroundImage3 from "../../assets/background_images/office_level_3.gif"
import mainPageBackgroundImage4 from "../../assets/background_images/office_level_4.gif"

// 레벨에 따른 배경 이미지 매핑 
const getBackgroundImage = (level: number) => {
  switch (level) {
    case 1:
      return mainPageBackgroundImage1;
    case 2:
      return mainPageBackgroundImage2;
    case 3:
      return mainPageBackgroundImage3;
    case 4:
      return mainPageBackgroundImage4;
    default:
      return mainPageBackgroundImage1; // 기본값
  }
}

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
        src={getBackgroundImage(gameDataStore.officeLevel)}
        alt={`메인 페이지 - 사무실 레벨 ${gameDataStore.officeLevel}`}
        className="absolute z-0 w-screen object-cover overflow-hidden h-[calc(100vh-64px)]"
        onError={(e) => {
          console.error(`Failed to load office level ${gameDataStore.officeLevel} background`, e);
          // 에러 발생시 기본 이미지로 fallback
          e.currentTarget.src = mainPageBackgroundImage1;
        }}
        onLoad={() => {
          console.log(`Successfully loaded office level ${gameDataStore.officeLevel} background`);
        }}
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