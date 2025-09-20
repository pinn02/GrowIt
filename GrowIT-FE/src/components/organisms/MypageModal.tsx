import mypageModalBackgroundImage from "../../assets/cards/window_card.png"
import MypageContent from "../atoms/MypageContent";

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
          className="mt-0 p-8 w-[40%] h-[60%] mb-40 relative pointer-events-auto"
          style={{
            backgroundImage: `url(${mypageModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: ""
          }}

        >
          <button
            className="absolute top-10 right-14 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
           <div className="flex mt-8 justify-center items-center">
            <MypageContent />
          </div>
        </div>
      </div>
    </>
  )
}

export default MypageModal