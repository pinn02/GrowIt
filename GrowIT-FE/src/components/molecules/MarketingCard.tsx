import { useGameDataStore } from "../../stores/gameDataStore";
import { useButtonStore } from "../../stores/buttonStore";
import SelectButton from "../atoms/Button";
import marketingCardImage from "../../assets/cards/paper_card.png";

type Marketing = {
  name: string;
  cost: number;
  image: string;
  action: string; 
};

type MarketingCardProps = {
  marketing: Marketing;
};

const selectButtonSize = 100  // 선택 버튼 최대 사이즈

// 마케팅 카드
function MarketingCard({ marketing }: MarketingCardProps) {
  const gameDataStore = useGameDataStore()
  const marketingButton = useButtonStore((state) => state.marketingButton)
  const setMarketingButton = useButtonStore((state) => state.setMarketingButton)
  
  // 선택 버튼 클릭 시 이벤트
  const marketingSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - marketing.cost)
    gameDataStore.setEnterpriseValue(gameDataStore.enterpriseValue + marketing.cost / 10000)
    setMarketingButton(false)
  }

  return (
    <>
      <div className="relative w-[30%] h-auto mx-3 my-3">
        {/* 배경 이미지 */}
        <img src={marketingCardImage} alt="마케팅 카드" className="w-full h-auto" />

        {/* 내용 */}
        <div className="absolute h-[90%] inset-0 flex flex-col items-center justify-between p-2">
          {/* 마케팅 종류 */}
          <p className="font-bold text-clamp-title ps-2 text-center">
            {marketing.name}
          </p>

          {/* 마케팅 이미지 */}
          <div className="w-1/2 flex justify-center">
            <img src={marketing.image} alt={`${marketing.name} 아이콘`} className="w-full h-auto object-contain block" />
          </div>

          {/* 마케팅 데이터 */}
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
                  marketingButton
                  ? "bg-orange-400 text-black hover:bg-orange-500"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
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