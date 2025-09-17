import { useState } from "react";
import marketingCardImage from "../../assets/cards/paper_card.png";
import SelectButton from "../atoms/Button";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useButtonStore } from "../../stores/buttonStore";

type Marketing = {
  name: string;
  cost: number;
  image: string;
  action: string; 
};

type MarketingCardProps = {
  marketing: Marketing;
};

const selectButtonSize = 100

function MarketingCard({ marketing }: MarketingCardProps) {
  const marketingButton = useButtonStore((state) => state.marketingButton)
  const setMarketingButton = useButtonStore((state) => state.setMarketingButton)
  const gameDataStore = useGameDataStore()
  
  const marketingSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - marketing.cost)
    gameDataStore.setEnterpriseValue(gameDataStore.enterpriseValue + Math.round(marketing.cost * (Math.random() * (1.25 - 0.75) + 0.75)))
  
    setMarketingButton(false)
  }

  return (
    <>
      <div className="relative w-[30%] h-auto mx-3 my-3">
        <img
          src={marketingCardImage}
          alt="마케팅 카드"
          className="w-full h-auto"
        />
        <div className="absolute h-[90%] inset-0 flex flex-col items-center justify-between p-2">
          <p className="font-bold text-clamp-title ps-2 text-center">
            {marketing.name}
          </p>
          <div className="w-1/2 flex justify-center">
            <img
              src={marketing.image}
              alt={`${marketing.name} 아이콘`}
              className="w-full h-auto object-contain block"
            />
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-sm text-clamp-base leading-relaxed text-center px-3 font-medium text-gray-700 h-12 flex items-center justify-center">
              {marketing.action}
            </p>
            <p className="text-clamp-base mb-1">
              비용: {marketing.cost.toLocaleString()}G
            </p>
            <div className="mt-1 w-full bottom-[10%]">
              <SelectButton
                disabled={!marketingButton || gameDataStore.finance < marketing.cost}
                maxSize={selectButtonSize}
                className={`w-[80%] rounded transition-colors mx-3 text-clamp-base ${
                  !marketingButton
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-orange-400 text-black hover:bg-orange-500"
                }`}
                onClick={marketingSelected}
              >
                {marketingButton ? (gameDataStore.finance >= marketing.cost ? "선택" : "자금 부족") : "선택 완료"}
              </SelectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketingCard;