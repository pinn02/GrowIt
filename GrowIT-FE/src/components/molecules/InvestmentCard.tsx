import { useState } from "react"
import investmentCardImage from "../../assets/cards/window_card.png"
import SelectButton from "../atoms/Button"
import { useButtonStore } from "../../stores/buttonStore"
import { useGameDataStore } from "../../stores/gameDataStore"

type Investment = {
  name: string
  cost: number
  content: string
}

type InvestmentCardProps = {
  investment: Investment
}

function InvestmentCard({ investment }: InvestmentCardProps) {
  const investmentButton = useButtonStore((state) => state.investmentButton)
  const setInvestmentButton = useButtonStore((state) => state.setInvestmentButton)
  const gameDataStore = useGameDataStore()

  const investmentSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - investment.cost)
    
    if (investment.name === "설비 투자") {
      gameDataStore.setProductivity(gameDataStore.productivity + Math.round(investment.cost / 1000 * (Math.random() * (1.25 - 0.75) + 0.75)))
    } else if (investment.name === "R&D 투자") {
      gameDataStore.setProductivity(gameDataStore.productivity + Math.round(investment.cost / 1000 * (Math.random() * (1.25 - 0.75) + 0.75)))
    }

    setInvestmentButton(false)
  }

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
        
        <div className="absolute left-[15%] top-[45%] w-[70%] h-[25%] flex flex-col justify-start">
          <p className="text-clamp-base mb-2 leading-relaxed text-center px-1 font-medium text-gray-700">
            {investment.content}
          </p>
          <p className="text-clamp-base text-center">
            비용: {investment.cost.toLocaleString()}G
          </p>
        </div>
        
        <div className="absolute left-[10%] top-[75%] w-[80%] h-[15%] flex items-center justify-center">
          <SelectButton
            disabled={!investmentButton || gameDataStore.finance < investment.cost}
            className={`w-full py-2 rounded transition-colors ${
              investmentButton
                ? "bg-orange-400 text-black hover:bg-orange-500"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            onClick={() => investmentSelected()}
          >
            {investmentButton ? (gameDataStore.finance >= investment.cost ? "선택" : "자금 부족") : "선택 완료"}
          </SelectButton>
        </div>
      </div>
    </>
  )
}

export default InvestmentCard