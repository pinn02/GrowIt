import { useState, useEffect } from "react"

interface StoryModalProps {
  onClose: () => void;
}

function StoryModal({ onClose }: StoryModalProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // 컴포넌트 마운트 후 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // 스크롤 애니메이션 완료 후 버튼 표시
  useEffect(() => {
    if (showAnimation) {
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 12000); 
      
      return () => clearTimeout(buttonTimer);
    }
  }, [showAnimation]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      {/* 모달 창 */}
      <div className="bg-white rounded-lg shadow-2xl border border-gray-300 max-w-2xl w-full mx-4 text-center overflow-hidden" style={{ height: '67vh' }}>
        {/* 스크롤 영역 */}
        <div className="relative w-full h-full overflow-hidden">
          {/* 자동 스크롤되는 텍스트 */}
          <div 
            className={`absolute w-full text-center px-8 ${
              showAnimation ? 'animate-modal-scroll' : ''
            }`}
            style={{ bottom: '0%' }}
          >
            <div className="text-gray-800 leading-relaxed space-y-6">
              <div className="py-8"></div> 
              
              <p className="text-lg">지난 30년, 세상은 별별 일이 다 있었다.</p>
              <p className="text-lg">IMF, 닷컴버블, 스타트업붐, AI열풍...</p>
              <p className="text-lg">그 모든 흔적이 데이터로 남았다.</p>
              
              <div className="py-4"></div>
              
              <p className="text-lg">우리는 30년치 데이터를 재구성했다.</p>
              <p className="text-lg">이제 당신이 그 데이터 위에서</p>
              <p className="text-lg">회사를 키워나가야 한다.</p>
              
              <div className="py-4"></div>
              
              <p className="text-lg">처음에는 자본도 적고 직원도 없지만,</p>
              <p className="text-lg">매달 경제리포트와 랜덤이벤트가</p>
              <p className="text-lg">당신의 선택을 시험할 것이다.</p>
              
              <div className="py-6"></div>
              
              <p className="text-xl font-semibold text-blue-600">30턴, 30년의 여정.</p>
              <p className="text-xl font-semibold text-blue-600">당신의 선택에 달려있다.</p>
              
              <div className="py-6"></div>
              
              <p className="text-2xl font-bold text-gray-900">자, 이제 시작해보자!</p>
              
              <div className="py-16"></div> 
            </div>
          </div>
          
          {/* 게임 시작 버튼 */}
          {showButton && (
            <div className="absolute inset-x-0 bottom-8 flex justify-center animate-fadeIn">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
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