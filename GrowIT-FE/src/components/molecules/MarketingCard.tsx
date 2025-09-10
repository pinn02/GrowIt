import MarketingCardImage from "../../assets/cards/paper_card.png"
import MarketingButton from "../atoms/MarketingButton"

function MarketingCard() {
  return (
    <div className="relative mx-3 w-[30%]">
      <img src={MarketingCardImage} alt="마케팅 카드" className="w-full h-auto object-contain" />

      <div className="absolute inset-0 flex items-center justify-center">
        <MarketingButton />
      </div>
    </div>
  )
}

export default MarketingCard
