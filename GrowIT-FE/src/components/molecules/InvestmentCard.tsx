import WindowCardImage from "../../assets/cards/window_card.png"
import InvestmentButton from "../atoms/InvestmentButton"

function InvestmentCard() {
  return (
    <div className="relative mx-3 w-[40%]">
      <img src={WindowCardImage} alt="모니터 카드" className="w-full h-auto object-contain" />

      <div className="absolute inset-0 flex items-center justify-center">
        <InvestmentButton />
      </div>
    </div>
  )
}

export default InvestmentCard
