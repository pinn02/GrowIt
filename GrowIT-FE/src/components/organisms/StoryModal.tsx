import { useState, useEffect } from "react"
import backgroundImage from "../../assets/background_images/board_page_background_image.png";

interface StoryModalProps {
  onClose: () => void;
}

function StoryModal({ onClose }: StoryModalProps) {
  const [showButton, setShowButton] = useState(false);
  
  // 컴포넌트 마운트 후 버튼 표시
  useEffect(() => {
    setShowButton(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-50">
      {/* 모달 창 */}
      <div 
        className="shadow-2xl w-4/5 max-h-[100vh] mx-4 text-center overflow-hidden flex flex-col justify-between" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* 스크롤 영역 */}
        <div className="relative w-full h-full p-4 flex flex-col justify-center">
          {/* 텍스트 컨테이너 */}
          <div className="w-full h-full overflow-y-auto custom-scrollbar">
            <div className="text-gray-800 leading-snug space-y-2 text-[10px] sm:text-xs md:text-sm">
              <p>지난 30년, 세상은 별별 일이 다 있었다.</p>
              <p>IMF, 닷컴버블, 스타트업붐, AI열풍...</p>
              <p>그 모든 흔적이 데이터로 남았다.</p>
              
              <div className="py-0.5"></div>
              
              <p>우리는 30년치 데이터를 재구성했다.</p>
              <p>이제 당신이 그 데이터 위에서</p>
              <p>회사를 키워나가야 한다.</p>
              
              <div className="py-0.5"></div>
              
              <p>처음에는 자본도 적고 직원도 없지만, 매달 턴 리포트와 랜덤이벤트가</p>
              <p>매달 경제리포트와 랜덤이벤트가</p>
              <p>당신의 선택을 시험할 것이다.</p>
              
              <div className="py-1"></div>
              
              <p className="text-xs sm:text-sm md:text-base font-semibold text-blue-600">
                30턴, 30년의 여정.
              </p>
              <p className="text-xs sm:text-sm md:text-base font-semibold text-blue-600">
                당신의 선택에 달려있다.
              </p>

              <div className="py-1"></div>

              <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                자, 이제 시작해보자!
              </p>
            </div>
          </div>
          
          {/* 게임 시작 버튼 */}
          {showButton && (
            <div className="mt-4 flex justify-center animate-fadeIn">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-orange-500 text-white font-bold text-base rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                게임 시작!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryModal;