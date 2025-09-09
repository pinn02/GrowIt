import mainPageBackgroundImage from "../../assets/background_images/main_page_background_image.gif"
import hiringImage from "../../assets/actions/hiring.png"
import marketingImage from "../../assets/actions/marketing.png"
import investmentImage from "../../assets/actions/investment.png"
import projectImage from "../../assets/actions/project.png"

function MainPage() {
  return (
    <>
      <img
        src={ mainPageBackgroundImage }
        alt="메인 페이지"
        className="absolute z-0 w-screen object-cover overflow-hidden h-[calc(100vh-64px)]"
      />
      <div className="text-center relative h-[calc(100vh-64px)] z-10">
        <div className="flex absolute bottom-0 left-1/2 -translate-x-1/2">

        </div>
      </div>
    </>
  )
}

export default MainPage