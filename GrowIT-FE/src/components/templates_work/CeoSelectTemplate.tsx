import { useState } from "react"
import { useGameDataStore } from "../../stores/gameDataStore"
import CeoSelectButton from "../atoms/Button"

// CEO 정보 타입
type CeoInfo = {
  name: string;
  nickname: string;
  description: string[];
  effects: {
    positive: string[];
    negative: string[];
  };
}

type CeoSelectTemplateProps = {
  onCeoSelect?: () => void;
}

function CeoSelectTemplate({ onCeoSelect }: CeoSelectTemplateProps) {
  const [selectedCeo, setSelectedCeo] = useState<number | null>(null)
  
  // CEO 목록
  const ceoList: CeoInfo[] = [
    {
      name: "스티브 잡스",
      nickname: "스티브 잡아쓰",
      description: ["혁신적인 마케팅과 완벽한 프로젝트 실행력의 대명사"],
      effects: {
        positive: ["마케팅 보상 1.2배 증가", "프로젝트 보상 1.2배 증가"],
        negative: ["노조 파업 확률 2배 증가"]
      }
    },
    {
      name: "빌 게이츠",
      nickname: "빌",
      description: ["기술 혁신과 전략적 특허 투자의 선구자"],
      effects: {
        positive: ["R&D 투자 보상 1.3배 증가", "특허 등록 성공 확률 2배", "리스크 투자 확률 2.5배"],
        negative: []
      }
    },
    {
      name: "일론 머스크",
      nickname: "일론 머쓰타드",
      description: ["압도적인 생산성과 위험한 도전 정신의 소유자"],
      effects: {
        positive: ["턴당 생산량 1.5배 증가", "리스크 투자 확률 1.5배 증가"],
        negative: ["CEO 리스크 2배 증가"]
      }
    },
    {
      name: "마크 주커버그",
      nickname: "마크",
      description: ["소셜 미디어와 마케팅 전략의 천재"],
      effects: {
        positive: ["마케팅 보상 1.3배 증가"],
        negative: ["고용 비용 1.2배 증가"]
      }
    },
    {
      name: "도날드 트럼프",
      nickname: "개그캐",
      description: ["화제성과 미디어 활용의 달인, 자본력 보유"],
      effects: {
        positive: ["초기자본 2배", "바이럴/미디어 이벤트 효과 3배 증가", "마케팅 보상 1.3배 증가"],
        negative: []
      }
    },
    {
      name: "젠슨 황",
      nickname: "젠슨",
      description: ["AI와 GPU 기술 혁신의 선두주자"],
      effects: {
        positive: ["R&D 투자 보상 1.5배 증가", "GPU/AI 관련 이벤트 보상 2배 증가"],
        negative: []
      }
    },
    {
      name: "제프 베이조스",
      nickname: "아마존",
      description: ["글로벌 확장과 효율적인 마케팅의 대가"],
      effects: {
        positive: ["글로벌 프로젝트 보상 1.5배 증가", "마케팅 비용 0.8배"],
        negative: []
      }
    }
  ]

  const selectButtonSize = 700  // CEO 선택 버튼 최대 사이즈

  const handleCeoSelect = (index: number) => {
    setSelectedCeo(index)
  }

  const gameDataStore = useGameDataStore()

  const handleConfirm = () => {
    if (selectedCeo !== null) {
      gameDataStore.setSelectedCeo(selectedCeo)
      console.log(`Selected CEO: ${ceoList[selectedCeo].name}`)
      onCeoSelect?.()  // 콜백 호출
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-6">
      <div className="flex flex-col items-center w-full max-w-6xl">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">CEO 선택</h1>
          <p className="text-lg text-gray-200">당신의 회사를 이끌 CEO를 선택하세요</p>
        </div>

        {/* CEO 선택 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full mb-8 max-w-5xl">
          {ceoList.map((ceo, idx) => (
            <div
              key={idx}
              className={`
                bg-gray-800 rounded-lg p-3 cursor-pointer transition-all duration-300 border-2 text-sm
                ${selectedCeo === idx 
                  ? 'border-orange-400 bg-orange-900/30 scale-105' 
                  : 'border-gray-600 hover:border-gray-400 hover:bg-gray-700'
                }
              `}
              onClick={() => handleCeoSelect(idx)}
            >
              {/* CEO 이름 */}
              <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-white">{ceo.name}</h3>
                <p className="text-xs text-orange-300">({ceo.nickname})</p>
              </div>

              {/* CEO 설명 */}
              <div className="mb-2">
                {ceo.description.map((desc, descIdx) => (
                  <p key={descIdx} className="text-xs text-gray-300 text-center">{desc}</p>
                ))}
              </div>

              {/* 긍정적 효과 */}
              {ceo.effects.positive.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-green-400 mb-1">💰 보너스:</p>
                  <ul className="text-xs text-green-300">
                    {ceo.effects.positive.map((effect, effectIdx) => (
                      <li key={effectIdx} className="mb-1">• {effect}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 부정적 효과 */}
              {ceo.effects.negative.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">⚠️ 리스크:</p>
                  <ul className="text-xs text-red-300">
                    {ceo.effects.negative.map((effect, effectIdx) => (
                      <li key={effectIdx} className="mb-1">• {effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 확인 버튼 */}
        <CeoSelectButton
          maxSize={selectButtonSize}
          className={`
            w-1/4 block font-extrabold text-black px-4 py-3 rounded transition-colors
            ${selectedCeo !== null
              ? 'bg-orange-300 hover:bg-orange-400 cursor-pointer'
              : 'bg-gray-500 cursor-not-allowed opacity-50'
            }
          `}
          disabled={selectedCeo === null}
          onClick={handleConfirm}
        >
          {selectedCeo !== null ? `${ceoList[selectedCeo].name} 선택` : 'CEO를 선택하세요'}
        </CeoSelectButton>
      </div>
    </div>
  )
}

export default CeoSelectTemplate