import { useState, useEffect } from "react";
import backgroundImage from "../../assets/background_images/store_page_background_image7.png";

interface StoryModalProps {
  onClose: () => void;
}

function StoryModal({ onClose }: StoryModalProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-2">
      <div
        className="relative w-full max-w-xl mx-auto rounded-md shadow-2xl flex flex-col overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "200%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f9f6f2",
          maxHeight: "80vh", 
        }}
      >
        {/* 헤더 */}
        <div className="bg-black/80 text-white text-center py-2 border-b border-gray-700">
          <h1
            className="text-base sm:text-lg font-bold"
          >
            GrowIT 이용 가이드
          </h1>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-gray-900 text-xs sm:text-sm leading-snug
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-200
        ">
          <h2 className="text-center text-blue-900 font-bold text-sm sm:text-base mb-2">
            " 30턴 동안 회사를 성장시켜라 "
          </h2>

          {/* 게임 목표 */}
          <section className="bg-white/80 border border-gray-300 rounded p-2 shadow-sm">
            <p className="text-[10px] font-press-start bg-gray-200 border px-1.5 py-0.5 rounded-sm inline-block mb-1">
              게임 목표
            </p>
            <ul className="list-disc list-inside">
              <li>30턴 동안 회사를 성장시키세요</li>
              <p className="text-red-500">* 자본이 0G 되면 파산 (게임 오버)</p>
            </ul>
          </section>

          {/* 핵심 지표 */}
          <section className="bg-white/80 border border-gray-300 rounded p-2 shadow-sm">
            <p className="text-[10px] font-press-start bg-gray-200 border px-1.5 py-0.5 rounded-sm inline-block mb-1">
              핵심 지표
            </p>
            <ul className="list-disc list-inside">
              <li><b>자산</b>: 회사 현금</li>
              <li><b>기업 가치</b>: 소비자 신뢰도</li>
              <li><b>생산성</b>: 직원 업무 효율</li>
            </ul>
            <p className="text-red-500">* 각 지표는 클릭하면 상세 설명을 볼 수 있습니다</p>
            <p className="text-red-500">* 세 지표의 결과에 따라 <b>엔딩이 달라집니다</b></p>
          </section>

          {/* 매 턴 행동 */}
          <section className="bg-white/80 border border-gray-300 rounded p-2 shadow-sm">
            <p className="text-[10px] font-press-start bg-gray-200 border px-1.5 py-0.5 rounded-sm inline-block mb-1">
              매 턴 행동
            </p>
            <ul className="list-disc list-inside">
              <li><b>생산성 ↑</b> : 고용, 투자</li>
              <li><b>기업 가치 ↑</b> : 마케팅, 프로젝트</li>
              <li><b>자본 ↑</b> : 프로젝트가 자본을 획득하는 핵심 수단입니다</li>
            </ul>
          </section>

          {/* 랜덤 이벤트 */}
          <section className="bg-white/80 border border-gray-300 rounded p-2 shadow-sm">
            <p className="text-[10px] font-press-start bg-gray-200 border px-1.5 py-0.5 rounded-sm inline-block mb-1">
              랜덤 이벤트
            </p>
            <p>턴 종료 시 예기치 못한 이벤트가 발생합니다</p>
          </section>

          {/* 스토어 */}
          <section className="bg-white/80 border border-gray-300 rounded p-2 shadow-sm">
            <p className="text-[10px] font-press-start bg-gray-200 border px-1.5 py-0.5 rounded-sm inline-block mb-1">
              스토어
            </p>
            <p>회사의 복지 시설을 단계별로 업그레이드할 수 있습니다</p>
            <p>업그레이드 순서:</p>
            <ul className="list-disc list-inside">
              <li>
                통근버스 → 기숙사 → 헬스장 → 카페테리아 → 병원 → 어린이집 → 북카페 → 본사 건물
              </li>
            </ul>
            <p>각 시설은 기업 가치와 생산성 향상에 기여합니다</p>
            <p className="text-red-500"> * Lv3까지 업그레이드 가능, <b>본사 건물 업그레이드 시 UI가 변경</b>됩니다</p>
          </section>

          <p className="text-center font-bold mt-2">
            준비되셨나요? 지금 바로 회사를 키워보세요!
          </p>
        </div>

        {/* 버튼 */}
        {showButton && (
          <div className="text-center py-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 font-press-start text-xs bg-blue-600 text-white border-2 border-blue-800 rounded shadow hover:bg-blue-700 transition-colors"
            >
              게임 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryModal;
