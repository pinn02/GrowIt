import { useState } from "react"
import marketingCardImage from "../../assets/cards/paper_card.png"
import SelectButton from "../atoms/Button"

type Marketing = {
  name: string
  effect: string
  cost: number
}

type MarketingCardProps = {
  marketing: Marketing
}

function MarketingCard({ marketing }: MarketingCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const selectButtonSize = 48

  return (
    <>
      <div className="relative w-[30%] h-auto object-contain mx-3 my-3">
        <img
          src={marketingCardImage}
          alt="지원자 카드"
          className="w-full h-auto"
        />
        <div className="absolute left-[10%] top-[5%] w-[80%]">
          <p className="font-bold text-clamp-title text-center ms-4">{marketing.name}</p>
        </div>
        <div className="absolute left-[10%] top-[40%] w-[80%]">
          <p className="text-clamp-base mb-6">효과: {marketing.effect}</p>
          <p className="text-clamp-base">비용: {marketing.cost.toLocaleString()}G</p>
        </div>
        <div className="flex justify-center absolute left-[10%] top-[80%] w-[80%]">
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

export default MarketingCard


// import MarketingCardImage from "../../assets/cards/paper_card.png"
// import DecisionButton from "../atoms/DecisionButton"

// type MarketingCardProps = {
//   cardType: string;
//   selected: boolean; // 카드의 선택 여부 표시
//   onSelect: () => void; // 모달에서 카드 선택하면 배열에 추가하라
// }

// function MarketingCard({ cardType, selected, onSelect }: MarketingCardProps) {
//   return (
//     <div className="relative mx-3 w-[31%]">
//       <img src={MarketingCardImage} alt="마케팅 카드" className="w-full h-auto object-contain" />

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

// export default MarketingCard
