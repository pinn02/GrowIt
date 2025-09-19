import { useState, useEffect } from "react";
import { useGameDataStore } from "../../stores/gameDataStore";
import CloseButton from "../atoms/Button";
import marketingModalBackgroundImage from "../../assets/background_images/board_page_background_image2.png";
import MarketingCard from "../molecules/MarketingCard";
import newspaperImage from "../../assets/icons/newspaper.png";
import snsImage from "../../assets/icons/sns.png";
import tvImage from "../../assets/icons/tv.png";
import marketingData from "../../assets/data/randomMarketing.json";

const channelImages = [
  newspaperImage,
  snsImage,
  tvImage,
]

type Marketing = {
  name: string;
  action: string;
  cost: number;
  image: string;
};

type MarketingModalProps = {
  onClose: () => void;
};

// 마케팅 모달
function MarketingModal({ onClose }: MarketingModalProps) {
  const [marketings, setMarketings] = useState<Marketing[]>([]);
  // const marketingArray = useGameDataStore(state => state.marketingArray)
  // const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)

  // 마케팅 모달 실행 시 마케팅 데이터 지정
  useEffect(() => {
    // if (!marketingArray) return
    
    const newMarketings = marketingData.map((mar, idx) => {
      // const selectedIndex = marketingArray[idx]
      return {
        name: mar.name,
        // action: mar.actions[selectedIndex],
        // cost: mar.costs[selectedIndex],
        image: channelImages[idx]
      }
    })

    // setMarketings(newMarketings)
  }, [])

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none" onClick={onClose}>
      {/* 마케팅 모달 배경 이미지 */}
      <div
        className="w-11/12 md:w-8/12 max-w-5xl relative rounded-xl pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url(${marketingModalBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "6rem 2rem 2rem 2rem",
        }}
      >
        {/* 모달 명 */}
        <h2 className="absolute top-14 left-1/2 -translate-x-1/2 text-center text-4xl font-extrabold text-white drop-shadow-lg">
          마케팅
        </h2>
        {/* 닫기 버튼 */}
        <CloseButton
          className="absolute top-12 right-15 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
          onClick={onClose}
        >
          X
        </CloseButton>
        
        {/* 데이터 */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4">
          {marketings.map((marketing, idx) => (
            <MarketingCard key={idx} marketing={marketing} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketingModal;