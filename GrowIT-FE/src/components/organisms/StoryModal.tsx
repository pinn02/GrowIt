import { useState, useEffect } from "react";
import backgroundImage from "../../assets/background_images/story_page_background_image.png";

interface StoryModalProps {
  onClose: () => void;
}

function StoryModal({ onClose }: StoryModalProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      {/* 모달 박스 */}
      <div
        className="relative shadow-2xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:max-w-3xl aspect-[3/2] mx-4 text-center overflow-hidden flex flex-col justify-between p-2 sm:p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 텍스트 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="mt-13 text-gray-800 leading-snug space-y-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
            <p>지난 30년, 세상은 별별 일이 다 있었다.</p>
            <p>IMF, 닷컴버블, 스타트업붐, AI열풍...</p>
            <p>그 모든 흔적이 데이터로 남았다.</p>

            <div className="py-0.5"></div>

            <p>우리는 30년치 데이터를 재구성했다.</p>
            <p>이제 당신이 그 데이터 위에서</p>
            <p>회사를 키워나가야 한다.</p>

            <div className="py-0.5"></div>

            <p>
              처음에는 자본도 적고 직원도 없지만, 매달 턴 리포트와 랜덤이벤트가
            </p>
            <p>매달 경제리포트와 랜덤이벤트가</p>
            <p>당신의 선택을 시험할 것이다.</p>

            <div className="py-1"></div>

            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-blue-600">
              30턴, 30년의 여정.
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-blue-600">
              당신의 선택에 달려있다.
            </p>

            <div className="py-1"></div>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900">
              자, 이제 시작해보자!
            </p>
          </div>
        </div>

        {/* 버튼 */}
        {showButton && (
        <div className="flex justify-center animate-fadeIn">
          <button
            onClick={onClose}
            className="mb-11 px-2 py-1 sm:px-3 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2 
                      bg-orange-500 text-white font-bold 
                      text-[10px] sm:text-xs md:text-sm lg:text-base 
                      rounded-md hover:bg-orange-600 transition-colors shadow-md"
          >
            게임 시작!
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default StoryModal;
