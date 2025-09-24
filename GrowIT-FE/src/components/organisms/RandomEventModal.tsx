// import CloseButton from "../atoms/Button";
import { useEffect, useState } from "react";
import randomEventsData from "../../assets/data/randomEvents.json";
import { useGameDataStore } from "../../stores/gameDataStore";
import treasureBoxImage from "../../assets/icons/treasure_box.png"; 

type RandomEvent = {
  title: string;
  content: string;
  finance: number;
  enterpriseValue: number;
  productivity: number;
  image: string;
};

type RandomEventModalProps = {
  onClose: () => void;
};

function RandomEventModal({ onClose }: RandomEventModalProps) {
  const [eventIndex, setEventIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  // const [showContent, setShowContent] = useState(false);
  const [eventResultType, setEventResultType] = useState<
    "positive" | "negative"
  >("positive");

  const gameDataStore = useGameDataStore();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * randomEventsData.length);
      setEventIndex(randomIdx);
      setIsLoading(false);

      const event = randomEventsData[randomIdx];
      if (event.finance >= 0) {
        setEventResultType("positive");
      } else {
        setEventResultType("negative");
      }

      // setTimeout(() => setShowContent(true), 300);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  const event: RandomEvent | undefined =
    eventIndex !== -1 ? randomEventsData[eventIndex] : undefined;

  const effectApply = () => {
    if (event) {
      gameDataStore.setEnterpriseValue(
        gameDataStore.enterpriseValue + event.enterpriseValue * (eventResultType === "positive" ? gameDataStore.goodRandomEventEnterpriseValue : gameDataStore.badRandomEventEnterpriseValue)
      );
      gameDataStore.setProductivity(
        gameDataStore.productivity + event.productivity * (event.productivity > 0 ? gameDataStore.goodRandomEventProductivity : gameDataStore.badRandomEventProductivity)
      );
      gameDataStore.setFinance(gameDataStore.finance + event.finance * (event.finance > 0 ? gameDataStore.goodRandomEventFinance : gameDataStore.badRandomEventFinance));
    }
    onClose();
  };

  return (
    <>
      <div 
        className="fixed z-50 flex items-center justify-center p-2 sm:p-4"
        style={{
          top: '60px',
          left: '0',
          right: '0',
          height: 'calc(100vh - 60px)'
        }}
      >
        
        {isLoading ? (
          /* 신문 로딩 스타일 */
          <div 
            className="shadow-2xl relative bg-white border-4 border-gray-800 w-1/2 min-w-96 mx-auto"
            style={{ 
              minHeight: '200px'
            }}
          >
            <div className="p-3 sm:p-4 md:p-5 text-center">
              <img
                src={treasureBoxImage}
                alt="Loading"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 animate-pulse"
              />
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
                GrowIT NEWS
              </h2>
              <p 
                className="text-gray-800 text-sm sm:text-base md:text-lg font-serif mb-3 sm:mb-4"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                속보를 준비 중입니다...
              </p>
              <div className="w-32 sm:w-40 md:w-48 h-1.5 sm:h-2 bg-gray-300 mx-auto rounded-full">
                <div className="h-full bg-black animate-pulse rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        ) : (
          event && (
            /* 신문 스타일 이벤트 */
            <div 
              className="shadow-2xl relative w-1/2 min-w-96 mx-auto"
              style={{ 
                backgroundColor: '#f5f5f0',
                backgroundImage: 'linear-gradient(135deg, #f5f5f0 0%, #e8e8e3 25%, #f0f0eb 50%, #e8e8e3 75%, #f5f5f0 100%)',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto'
              }}
            >

              {/* 신문 헤더 */}
              <div className="bg-black bg-opacity-85 text-white p-2 sm:p-3 md:p-4 border-b-2 border-gray-800 relative">
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>
                      GrowIT NEWS
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base mt-1">
                      {new Date().toLocaleDateString('ko-KR')} | {eventResultType === 'positive' ? '경제면' : '사회면'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 sm:p-3 md:p-4 relative">
                {/* 메인 헤드라인 */}
                <div className="border-b-2 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
                  <h2 
                    className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center leading-tight ${
                      eventResultType === 'positive' ? 'text-blue-900' : 'text-red-900'
                    }`}
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    {event.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  
                  {/* 메인 기사 */}
                  <div className="lg:col-span-2">
                    {/* 첫 번째 문단 - 리드 */}
                    <div className="mb-1 sm:mb-2">
                      <p 
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 leading-relaxed mb-1 sm:mb-2"
                        style={{ fontFamily: 'Times New Roman, serif', textIndent: '1em' }}
                      >
                        {event.content}
                      </p>
                    </div>

                    {/* 사진과 캡션 */}
                    <div className="mb-1 sm:mb-2 flex justify-center">
                      <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-3/5">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-18 sm:h-20 md:h-24 lg:h-28 object-cover border-2 border-gray-400 grayscale rounded-sm"
                        />
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 italic text-center">
                          ▲ 사건 현장 모습 (GrowIT뉴스 제공)
                        </p>
                      </div>
                    </div>

                    {/* 추가 기사 내용 */}
                    <div className="text-gray-800 text-xs sm:text-sm md:text-base">
                      <p style={{ fontFamily: 'Times New Roman, serif', textIndent: '1em', lineHeight: '1.4' }}>
                        이번 사건으로 인해 우리 회사의 주요 지표들에 상당한 변화가 예상되고 있다.
                      </p>
                    </div>
                  </div>

                  {/* 사이드바 - 통계 박스 */}
                  <div className="lg:col-span-1 space-y-1 sm:space-y-2">
                    <div className="bg-gray-100 bg-opacity-90 border-2 border-gray-800 p-1.5 sm:p-2 md:p-3 rounded-sm">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-center mb-1 sm:mb-2 bg-black bg-opacity-90 text-white py-0.5 sm:py-1 -mx-1">
                        영향도 분석
                      </h3>
                      
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex justify-between items-center border-b border-gray-400 pb-0.5">
                          <span className="font-semibold text-xs sm:text-sm md:text-base">자본 변화</span>
                          <span className={`font-bold text-xs sm:text-sm md:text-base ${event.finance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.finance >= 0 ? '▲' : '▼'} {Math.abs(event.finance).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-400 pb-0.5">
                          <span className="font-semibold text-xs sm:text-sm md:text-base">기업가치</span>
                          <span className={`font-bold text-xs sm:text-sm md:text-base ${event.enterpriseValue >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.enterpriseValue >= 0 ? '▲' : '▼'} {Math.abs(event.enterpriseValue).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-xs sm:text-sm md:text-base">생산성</span>
                          <span className={`font-bold text-xs sm:text-sm md:text-base ${event.productivity >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.productivity >= 0 ? '▲' : '▼'} {Math.abs(event.productivity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 관련기사 박스 */}
                    <div className="bg-gray-100 bg-opacity-90 border-2 border-gray-800 p-1.5 sm:p-2 md:p-3 rounded-sm">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-center mb-1 sm:mb-2 bg-black bg-opacity-90 text-white py-0.5 sm:py-1 -mx-1">
                        분석
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                        {eventResultType === 'positive' 
                          ? '이번 호재로 회사 성장이 예상된다.'
                          : '이번 악재로 대책 마련이 시급하다.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* 하단 버튼 - 모달 안으로 */}
                <div className="mt-1 sm:mt-2 text-center pt-1 sm:pt-2 border-t-2 border-black">
                  <button
                    onClick={effectApply}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 font-bold text-white text-xs sm:text-sm border-2 rounded transition-colors duration-200 ${
                      eventResultType === 'positive' 
                        ? 'bg-blue-600 hover:bg-blue-700 border-blue-800' 
                        : 'bg-red-600 hover:bg-red-700 border-red-800'
                    }`}
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    기사 확인 완료
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default RandomEventModal;