import { useState } from "react"
import CloseButton from "../atoms/Button"
import investmentModalBackgroundImage from "../../assets/modals/investment_modal_background.png"
import InvestmentCard from "../molecules/InvestmentCard"

const investments = [
  { name: "Enhancing Welfare", effect: "Small", cost: 10000 },
  { name: "Utility Reinforce", effect: "Middle", cost: 100000 },
  { name: "Research & Development", effect: "Big", cost: 1000000 }
]

type InvestmentModalProps = {
  onClose: () => void
}

function InvestmentModal({ onClose }: InvestmentModalProps) {
  

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
            <p className="absolute top-12 left-1/2 -translate-x-1/2 font-bold text-white text-3xl">
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
              { investments.map((investment, idx) => (
                  <InvestmentCard key={idx} investment={investment} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InvestmentModal