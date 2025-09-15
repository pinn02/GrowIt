import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage from "../../assets/background_images/1.png"

type MainTemplateProps = {
  openModal: (index: number) => void;
}

function MainTemplate({ openModal }: MainTemplateProps) {
  return (
    <>
      <img
        src={ mainPageBackgroundImage }
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