import { useState, useEffect } from "react"
import { useSaveStore } from "../../stores/saveStore";
import { useGameDataStore } from "../../stores/gameDataStore";
import CloseButton from "../atoms/Button"
import investmentModalBackgroundImage from "../../assets/modals/investment_modal_background.png"
import InvestmentCard from "../molecules/InvestmentCard"
import investmentData from "../../assets/data/randomInvestment.json";

type InvestmentModalProps = {
  onClose: () => void
}

// 투자 모달
function InvestmentModal({ onClose }: InvestmentModalProps) {
  const [investments, setInvestments] = useState<any[]>([])
  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const investmentArray = useGameDataStore(state => state.investmentArray)

  // 투자 모달 실행 시 표시할 데이터 지정
  useEffect(() => {
    if (!investmentArray) return

    const newInvestments = investmentData.map((inv, idx) => {
      const selectedIndex = investmentArray[idx]
      return {
        name: inv.name,
        cost: inv.costs[selectedIndex],
        content: inv.actions[selectedIndex],
      }
    })

    setInvestments(newInvestments)
  }, [investmentArray, currentSaveIdx])

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none overflow-hidden"
    >
      {/* 배경 이미지 */}
      <div
        className="mt-20 px-8 pt-8 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
        style={{
          backgroundImage: `url(${investmentModalBackgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        }}
      >
        {/* 모달명과 닫기 버튼 */}
        <div className="flex justify-between items-center mt-8">
          <p className="absolute top-12 left-1/2 -translate-x-1/2 font-bold text-3xl">
            투자
          </p>
          <CloseButton
            className="absolute top-12 right-15 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
            onClick={onClose}
            >
            X
          </CloseButton>
        </div>
        {/* 투자 카드 */}
        <div className="flex justify-center items-center p-0">
          {investments.map((investment, idx) => (
              <InvestmentCard key={idx} investment={investment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestmentModal