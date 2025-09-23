import CloseButton from "../atoms/Button";
import { useEffect, useState } from "react";
import randomEventsData from "../../assets/data/randomEvents.json";
import { useGameDataStore } from "../../stores/gameDataStore";
import treasureBoxImage from "../../assets/icons/treasure_box.png"; 
import boardBackgroundImage from "../../assets/background_images/board_page_background_image4.png";

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
  const [showContent, setShowContent] = useState(false);
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

      setTimeout(() => setShowContent(true), 300);
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
        className="fixed z-50 flex items-center justify-center p-4"
        style={{
          top: '60px',
          left: '0',
          right: '0',
          bottom: '0'
        }}
      >
        
        {isLoading ? (
          /* 신문 로딩 스타일 */
          <div 
            className="shadow-2xl relative bg-white border-4 border-gray-800"
            style={{ 
              width: '350px',
              minHeight: '250px'
            }}
          >
            <div className="p-6 text-center">
              <img
                src={treasureBoxImage}
                alt="Loading"
                className="w-16 h-16 mx-auto mb-4 animate-pulse"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Times New Roman, serif' }}>
                GrowIT NEWS
              </h2>
              <p 
                className="text-gray-800 text-base font-serif mb-4"
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                속보를 준비 중입니다...
              </p>
              <div className="w-40 h-2 bg-gray-300 mx-auto rounded-full">
                <div className="h-full bg-black animate-pulse rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        ) : (
          event && (
            /* 신문 스타일 이벤트 */
            <div 
              className="shadow-2xl relative"
              style={{ 
                width: '480px',
                maxWidth: '90vw',
                backgroundImage: `url(${boardBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >

              {/* 신문 헤더 */}
              <div className="bg-black bg-opacity-85 text-white p-3 border-b-2 border-gray-800 relative">
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>
                      GrowIT NEWS
                    </h1>
                    <p className="text-xs mt-1">
                      {new Date().toLocaleDateString('ko-KR')} | {eventResultType === 'positive' ? '경제면' : '사회면'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 relative">
                {/* 메인 헤드라인 */}
                <div className="border-b-2 border-black pb-3 mb-4">
                  <h2 
                    className={`text-xl font-bold text-center leading-tight ${
                      eventResultType === 'positive' ? 'text-blue-900' : 'text-red-900'
                    }`}
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    {event.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  
                  {/* 메인 기사 */}
                  <div className="lg:col-span-2">
                    {/* 첫 번째 문단 - 리드 */}
                    <div className="mb-2">
                      <p 
                        className="text-sm font-semibold text-gray-900 leading-relaxed mb-2"
                        style={{ fontFamily: 'Times New Roman, serif', textIndent: '1em' }}
                      >
                        {event.content}
                      </p>
                    </div>

                    {/* 사진과 캡션 */}
                    <div className="mb-2 flex justify-center">
                      <div className="w-4/5">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-24 object-cover border-2 border-gray-400 grayscale rounded-sm"
                        />
                        <p className="text-xs text-gray-600 mt-2 italic text-center">
                          ▲ 사건 현장 모습 (GrowIT뉴스 제공)
                        </p>
                      </div>
                    </div>

                    {/* 추가 기사 내용 */}
                    <div className="text-gray-800 text-xs">
                      <p style={{ fontFamily: 'Times New Roman, serif', textIndent: '1em', lineHeight: '1.4' }}>
                        이번 사건으로 인해 우리 회사의 주요 지표들에 상당한 변화가 예상되고 있다.
                      </p>
                    </div>
                  </div>

                  {/* 사이드바 - 통계 박스 */}
                  <div className="lg:col-span-1 space-y-3">
                    <div className="bg-gray-100 bg-opacity-90 border-2 border-gray-800 p-3 rounded-sm">
                      <h3 className="text-sm font-bold text-center mb-2 bg-black bg-opacity-90 text-white py-1 -mx-1">
                        영향도 분석
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-gray-400 pb-1">
                          <span className="font-semibold text-xs">자본 변화</span>
                          <span className={`font-bold text-sm ${event.finance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.finance >= 0 ? '▲' : '▼'} {Math.abs(event.finance).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-400 pb-1">
                          <span className="font-semibold text-xs">기업가치</span>
                          <span className={`font-bold text-sm ${event.enterpriseValue >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.enterpriseValue >= 0 ? '▲' : '▼'} {Math.abs(event.enterpriseValue).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-xs">생산성</span>
                          <span className={`font-bold text-sm ${event.productivity >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {event.productivity >= 0 ? '▲' : '▼'} {Math.abs(event.productivity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 관련기사 박스 */}
                    <div className="bg-gray-100 bg-opacity-90 border-2 border-gray-800 p-3 rounded-sm">
                      <h3 className="text-sm font-bold text-center mb-2 bg-black bg-opacity-90 text-white py-1 -mx-1">
                        분석
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                        {eventResultType === 'positive' 
                          ? '이번 호재로 회사 성장이 예상된다.'
                          : '이번 악재로 대책 마련이 시급하다.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* 하단 버튼 - 모달 안으로 */}
                <div className="mt-3 text-center pt-3 border-t-2 border-black">
                  <button
                    onClick={effectApply}
                    className={`px-4 py-2 font-bold text-white text-sm border-2 rounded ${
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