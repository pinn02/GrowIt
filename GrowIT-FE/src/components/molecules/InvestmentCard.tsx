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
  const selectButtonSize = 48

  return (
    <>
      <div className="relative w-[30%] h-auto object-contain mx-3 mt-10 mb-30">
        <img
          src={investmentCardImage}
          alt="지원자 카드"
          className="w-full h-auto"
        />
        <div className="absolute left-[10%] top-[15%] w-[80%]">
          <p className="font-bold text-clamp-title text-center ms-4">{investment.name}</p>
        </div>
        <div className="absolute left-[10%] top-[50%] w-[80%]">
          <p className="text-clamp-base">효과: {investment.effect}</p>
          <p className="text-clamp-base">비용: {investment.cost.toLocaleString()}G</p>
        </div>
        <div className="flex justify-center absolute left-[10%] top-[75%] w-[80%]">
          <SelectButton
            maxSize={selectButtonSize}
            disabled={isDisabled}
            className="
              bg-orange-400
              text-black
              px-auto
              py-auto
              rounded
              hover:bg-orange-500
              transition-colors
              mx-2
              text-clamp-base
              w-full
            "
            onClick={() => {
              setIsDisabled(true);
            }}
          >
            선택
          </SelectButton>
        </div>
      </div>
    </>
  )
}

export default InvestmentCard




// import InvestmentCardImage from "../../assets/cards/paper_card.png"
// import DecisionButton from "../atoms/DecisionButton"

// type InvestmentCardProps = {
//   cardType: string;
//   selected: boolean; // 카드의 선택 여부 표시
//   onSelect: () => void; // 모달에서 카드 선택하면 배열에 추가하라
// }

// function InvestmentCard({ cardType, selected, onSelect }: InvestmentCardProps) {
//   return (
//     <div className="relative mx-3 w-[31%]">
//       <img src={InvestmentCardImage} alt="투자 카드" className="w-full h-auto object-contain" />

//       <div className="absolute inset-0 flex items-center justify-center">
//         <DecisionButton 
//           cardType={cardType}
//           selected={selected}
//           onSelect={onSelect}
//         />
//       </div>
//     </div>
//   )
// }

// export default InvestmentCard
