import { useState } from "react";
import marketingCardImage from "../../assets/cards/paper_card.png";
import SelectButton from "../atoms/Button";

type Marketing = {
  name: string;
  cost: number;
  image: string;
  actionName?: string; 
};

type MarketingCardProps = {
  marketing: Marketing;
};

function MarketingCard({ marketing }: MarketingCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("선택");

  const handleSelect = () => {
    console.log(`${marketing.name} 마케팅을 선택했습니다.`);
    setIsDisabled(true);
    setButtonText("선택 완료!");
  };

  return (
    <>
      <div className="relative w-[30%] h-auto mx-3 my-3">
        <img
          src={marketingCardImage}
          alt="마케팅 카드"
          className="w-full h-auto"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 pt-10">
          <p className="font-bold text-clamp-title text-center">
            {marketing.name}
          </p>

          <div className="w-1/2 flex justify-center">
            <img
              src={marketing.image}
              alt={`${marketing.name} 아이콘`}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full flex flex-col items-center text-center">
            <p className="text-xs mb-2 leading-relaxed text-center px-1 font-medium text-gray-700 h-12 flex items-center justify-center">
              {marketing.actionName}
            </p>
            <p className="text-clamp-base">
              비용: {marketing.cost.toLocaleString()}G
            </p>
            <div className="mt-4 w-full">
              <SelectButton
                disabled={isDisabled}
                className={`w-full py-2 rounded transition-colors ${
                  isDisabled ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-orange-400 text-black hover:bg-orange-500"
                }`}
                onClick={handleSelect}
              >
                {buttonText}
              </SelectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarketingCard;