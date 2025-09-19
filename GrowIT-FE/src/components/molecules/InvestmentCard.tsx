import { useButtonStore } from "../../stores/buttonStore"
import { useGameDataStore } from "../../stores/gameDataStore"
import SelectButton from "../atoms/Button"
import investmentCardImage from "../../assets/cards/window_card.png"

type Investment = {
  name: string
  cost: number
  content: string
}

type InvestmentCardProps = {
  investment: Investment
}

const selectButtonSize = 300  // 선택 버튼 최대 사이즈

// 투자 카드
function InvestmentCard({ investment }: InvestmentCardProps) {
  // 실시간으로 해당 값의 변화에 반응하도록 Store에서 가져옴
  const investmentButton = useButtonStore((state) => state.investmentButton)
  const setInvestmentButton = useButtonStore((state) => state.setInvestmentButton)
  const gameDataStore = useGameDataStore()

  // 선택 버튼 클릭 시 이벤트
  const investmentSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - investment.cost)
    gameDataStore.setProductivity(gameDataStore.productivity + Math.round(investment.cost / 1000 * (Math.random() * (1.25 - 0.75) + 0.75)))
    setInvestmentButton(false)
  }

  return (
    <div className="relative w-[30%] aspect-[5/6] mx-3 mt-10 mb-30">
      {/* 카드 배경 이미지 */}
      <img src={investmentCardImage} alt="투자 카드" className="w-full h-full object-fill" />
      
      {/* 투자 종류 */}
      <div className="absolute left-[10%] top-[25%] w-[80%] h-[15%] flex items-center justify-center">
        <p className="font-bold text-clamp-title text-center line-clamp-2">
          {investment.name}
        </p>
      </div>
      
      {/* 투자 데이터 */}
      <div className="absolute left-[15%] top-[45%] w-[70%] h-[25%] flex flex-col justify-start">
        <p className="text-clamp-base mb-2 leading-relaxed text-center px-1 font-medium text-gray-700">
          {investment.content}
        </p>
        <p className="text-clamp-base text-center">
          비용: {investment.cost.toLocaleString()}G
        </p>
      </div>
      
      {/* 투자 선택 버튼 */}
      <div className="absolute left-[10%] top-[75%] w-[80%] h-[15%] flex items-center justify-center">
        <SelectButton
          disabled={!investmentButton || gameDataStore.finance < investment.cost} // 자금 부족 시 Disabled
          maxSize={selectButtonSize}
          className={`w-[80%] rounded transition-colors mx-3 text-clamp-base ${
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
  )
}

export default InvestmentCard