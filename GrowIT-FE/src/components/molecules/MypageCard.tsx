import WindowCardImage from "../../assets/cards/window_card.png"
import MypageContent from "../atoms/MypageContent"

function MypageCard() {
  return (
    <div className="relative mx-3 w-[70%]">
      <img src={WindowCardImage} alt="모니터 카드" className="w-full h-[400px] object-contain" />

      <div className="absolute inset-0 flex items-center justify-center">
        <MypageContent />
      </div>
    </div>
  )
}

export default MypageCard
