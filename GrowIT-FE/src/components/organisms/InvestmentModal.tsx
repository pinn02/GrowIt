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
        className="fixed inset-0 flex justify-center items-start z-50 pointer-events-none overflow-hidden"
      >
        <div
          className="mt-20 px-8 pt-6 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
          style={{
            backgroundImage: `url(${investmentModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        >
          <div className="flex justify-between items-center mt-3">
            <p className="mx-6 font-bold text-3xl">투자</p>
            <CloseButton
              className="
                bg-red-400
                text-black
                px-3
                py-0
                rounded
                hover:bg-red-500
                transition-colors
                mx-2
                text-clamp-title
                inline-flex
              "
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


// import { useState } from "react"
// import BoardBackgroundImage from "../../assets/background_images/board_page_background_image2.png"
// import InvestmentCard from "../molecules/InvestmentCard"

// type InvestmentModalProps = {
//   onClose: () => void;
// }

// const InvestmentModal = ({ onClose }: InvestmentModalProps) => {
//   // 여러 카드 선택 가능 
//   const [selectedCards, setSelectedCards] = useState<string[]>([])

//   // 카드 선택 처리
//   const handleSelectCard = (cardType: string) => {
//     if (!selectedCards.includes(cardType)) {
//       setSelectedCards([...selectedCards, cardType])
//       console.log(`${cardType} 선택완료`)
//     } else {
//       console.log(`${cardType} 이미 선택됨`)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
//       <div
//         className="mt-20 p-8 w-9/12 h-6/7 max-w-5xl relative pointer-events-auto"
//         style={{
//           backgroundImage: `url(${BoardBackgroundImage})`,
//           backgroundSize: "100% 100%",
//           backgroundPosition: "center"
//         }}
//       >
//         <button
//           className="absolute top-5 right-8 text-gray-500 hover:text-gray-800"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         <div className="flex mt-8 justify-center items-center">
//           <InvestmentCard 
//             cardType="Investment1" 
//             selected={selectedCards.includes("Investment1")} 
//             onSelect={() => handleSelectCard("Investment1")} 
//           />
//           <InvestmentCard 
//             cardType="Investment2"
//             selected={selectedCards.includes("Investment2")}
//             onSelect={() => handleSelectCard("Investment2")}
//           />
//           <InvestmentCard 
//             cardType="Investment3"
//             selected={selectedCards.includes("Investment3")}
//             onSelect={() => handleSelectCard("Investment3")}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InvestmentModal
