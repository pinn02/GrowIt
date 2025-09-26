import { useState, useEffect } from "react";
import { useSaveStore } from "../../stores/saveStore";
import { useGameDataStore } from "../../stores/gameDataStore";
import CloseButton from "../atoms/Button";
import { trackModalOpen, trackModalClose } from "../../config/ga4Config";
import marketingModalBackgroundImage from "../../assets/background_images/board_page_background_image2.png";
import MarketingCard from "../molecules/MarketingCard";
import newspaperImage from "../../assets/icons/newspaper.png";
import snsImage from "../../assets/icons/sns.png";
import tvImage from "../../assets/icons/tv.png";
import marketingData from "../../assets/data/randomMarketing.json";
import help2Icon from "../../assets/icons/help.png";

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
  const [showHelpModal, setShowHelpModal] = useState(false);
  const marketingArray = useGameDataStore(state => state.marketingArray)
  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)

  // GA4 tracking
  useEffect(() => {
    trackModalOpen('marketing');
  }, []);

  const handleClose = () => {
    trackModalClose('marketing');
    onClose();
  };

  // 마케팅 모달 실행 시 마케팅 데이터 지정
  useEffect(() => {
    if (!marketingArray) return
    
    const newMarketings = marketingData.map((mar, idx) => {
      const selectedIndex = marketingArray[idx]
      return {
        name: mar.name,
        action: mar.actions[selectedIndex],
        cost: mar.costs[selectedIndex],
        image: channelImages[idx]
      }
    })

    setMarketings(newMarketings)
  }, [marketingArray, currentSaveIdx])

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none" onClick={handleClose}>
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
        
        {/* 버튼들 */}
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
              cursor-pointer
            "
            onMouseEnter={() => setShowHelpModal(true)}
            onMouseLeave={() => setShowHelpModal(false)}
          >
            <img src={help2Icon} alt="도움말" className="w-7 h-7" />
          </button>
          {/* 닫기 버튼 */}
          <CloseButton
            className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
            onClick={handleClose}
          >
            X
          </CloseButton>
        </div>
        
        {/* 데이터 */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4">
          {marketings.map((marketing, idx) => (
            <MarketingCard key={idx} marketing={marketing} />
          ))}
        </div>
        
        {/* 도움말 모달 */}
        {showHelpModal && (
          <div 
            className="absolute top-16 right-20 z-50 pointer-events-none"
            onMouseEnter={() => setShowHelpModal(true)}
            onMouseLeave={() => setShowHelpModal(false)}
          >
            <div className="bg-white rounded-lg p-4 w-80 shadow-lg border border-gray-300 relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-black">마케팅 시스템 도움말</h3>
              </div>
              <div className="text-black space-y-2">
                <div className="space-y-1 text-xs">
                  <p>• 1턴 당 1개의 마케팅 방식을 선택할 수 있습니다</p>
                  <p>• 마케팅 시 기업가치가 상승합니다</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketingModal;