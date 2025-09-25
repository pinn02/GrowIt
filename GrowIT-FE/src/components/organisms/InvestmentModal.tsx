import { useState, useEffect } from "react"
import { useSaveStore } from "../../stores/saveStore";
import { useGameDataStore } from "../../stores/gameDataStore";
import CloseButton from "../atoms/Button"
import investmentModalBackgroundImage from "../../assets/modals/investment_modal_background.png"
import InvestmentCard from "../molecules/InvestmentCard"
import investmentData from "../../assets/data/randomInvestment.json";
import help2Icon from "../../assets/icons/help2.png";

type InvestmentModalProps = {
  onClose: () => void
}

// 투자 모달
function InvestmentModal({ onClose }: InvestmentModalProps) {
  const [investments, setInvestments] = useState<any[]>([])
  const [showHelpModal, setShowHelpModal] = useState(false)
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
        {/* 모달명과 버튼들 */}
        <div className="flex justify-between items-center mt-8">
          <p className="absolute top-12 left-1/2 -translate-x-1/2 font-bold text-3xl">
            투자
          </p>
          
          <div className="absolute top-12 right-15 flex items-center gap-2">
            {/* 도움말 버튼 */}
            <button
              className="
                hover:bg-blue-100
                transition-colors
                p-2
                rounded
                inline-flex
                items-center
                justify-center
              "
              onClick={() => setShowHelpModal(true)}
            >
              <img src={help2Icon} alt="도움말" className="w-6 h-6" />
            </button>
            {/* 닫기 버튼 */}
            <CloseButton
              className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
              onClick={onClose}
              >
              X
            </CloseButton>
          </div>
        </div>
        {/* 투자 카드 */}
        <div className="flex justify-center items-center p-0">
          {investments.map((investment, idx) => (
              <InvestmentCard key={idx} investment={investment} />
          ))}
        </div>
        
        {/* 도움말 모달 */}
        {showHelpModal && (
          <div className="absolute top-16 right-20 z-50">
            <div className="bg-white rounded-lg p-4 w-90 shadow-lg border border-gray-300 relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-black">투자 시스템 도움말</h3>
                <button
                  className="
                    hover:bg-red-100
                    text-black
                    px-2
                    py-1
                    rounded
                    transition-colors
                    text-sm
                  "
                  onClick={() => setShowHelpModal(false)}
                >
                  X
                </button>
              </div>
              <div className="text-black space-y-2">
                <div className="space-y-1 text-xs">
                  <p>• 1턴 당 1개의 투자 방식을 선택할 수 있습니다</p>
                  <p>• 투자 시 생산성이 증가합니다</p>
                  <p>• 생산성 500당 프로젝트 완료 보상이 10% 상승합니다</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestmentModal