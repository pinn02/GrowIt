import ActionButtonBundle from "../molecules/ActionButtonBundle"
import mainPageBackgroundImage from "../../assets/background_images/main_page_background_image.gif"

function MainPage() {
  return (
    <>
      <img
        src={ mainPageBackgroundImage }
        alt="메인 페이지"
        className="absolute z-0 w-screen object-cover overflow-hidden h-[calc(100vh-64px)]"
      />
      <div className="text-center relative h-[calc(100vh-64px)] z-10">
        <div className="flex absolute bottom-0 w-full">
          <ActionButtonBundle />
        </div>
      </div>
    </>
  )
}

export default MainPage