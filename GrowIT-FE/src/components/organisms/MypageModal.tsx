import monitorModalBackgroundImage from "../../assets/background_images/board_page_background_image2.png"
import MypageCard from "../molecules/MypageCard"

type MypageModalProps = {
  onClose: () => void;
}

const MypageModal= ({ onClose }: MypageModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
      >
        <div
          className="mt-20 p-8 w-9/12 h-6/7 max-w-5xl relative pointer-events-auto"
          style={{
            backgroundImage: `url(${monitorModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}

        >
          <button
            className="absolute top-5 right-8 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
           <div className="flex mt-8 justify-center items-center">
            <MypageCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default MypageModal