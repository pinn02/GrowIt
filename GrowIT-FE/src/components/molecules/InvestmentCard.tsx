import { useState } from "react"
import investmentCardImage from "../../assets/cards/window_card.png"
import SelectButton from "../atoms/Button"

type Investment = {
  name: string
  effect: string
  cost: number
}

type InvestmentCardProps = {
  investment: Investment
}

function InvestmentCard({ investment }: InvestmentCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <div className="relative w-[30%] aspect-[5/6] mx-3 mt-10 mb-30">
        <img
          src={investmentCardImage}
          alt="투자 카드"
          className="w-full h-full object-fill"
        />
       
        <div className="absolute left-[10%] top-[25%] w-[80%] h-[15%] flex items-center justify-center">
          <p className="font-bold text-clamp-title text-center line-clamp-2">
            {investment.name}
          </p>
        </div>
        
        <div className="absolute left-[15%] top-[50%] w-[80%] h-[20%] flex flex-col justify-center">
          <p className="text-clamp-base mb-1">효과: {investment.effect}</p>
          <p className="text-clamp-base">비용: {investment.cost.toLocaleString()}G</p>
        </div>
        
        <div className="absolute left-[10%] top-[75%] w-[80%] h-[15%] flex items-center justify-center">
          <SelectButton
            disabled={isDisabled}
            className={`w-full py-2 rounded transition-colors ${
              isDisabled 
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                : "bg-orange-400 text-black hover:bg-orange-500"
            }`}
            onClick={() => setIsDisabled(true)}
          >
            {isDisabled ? "선택됨" : "선택"}
          </SelectButton>
        </div>
      </div>
    </>
  )
}

export default InvestmentCard