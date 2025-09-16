import { useState, useEffect } from "react"
import CloseButton from "../atoms/Button"
import investmentModalBackgroundImage from "../../assets/modals/investment_modal_background.png"
import InvestmentCard from "../molecules/InvestmentCard"

import investmentData from "../../assets/data/randomInvestment.json";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useSaveStore } from "../../stores/saveStore";

type InvestmentModalProps = {
  onClose: () => void
}

function InvestmentModal({ onClose }: InvestmentModalProps) {
  // const gameDataStore = useGameDataStore()

  const [investments, setInvestments] = useState<any[]>([])

  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const hiringArray = useGameDataStore(state => state.hiringArray)

  useEffect(() => {
    if (!hiringArray) return

    const newInvestments = investmentData.map((inv, idx) => {
      const selectedIndex = hiringArray[idx]
      return {
        name: inv.name,
        cost: inv.costs[selectedIndex],
        content: inv.actions[selectedIndex],
      }
    })

    setInvestments(newInvestments)
  }, [hiringArray, currentSaveIdx])

  return (
    <>
      <div
        className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none overflow-hidden"
      >
        <div
          className="mt-20 px-8 pt-8 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
          style={{
            backgroundImage: `url(${investmentModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        >
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
            <div className="flex justify-center items-center p-0">
              {investments.map((investment, idx) => (
                  <InvestmentCard key={idx} investment={investment} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InvestmentModal