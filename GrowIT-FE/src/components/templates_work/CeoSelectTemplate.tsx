import { useState } from "react"
import { useGameDataStore } from "../../stores/gameDataStore"
import CeoSelectButton from "../atoms/Button"
import CeoCard from "../molecules/CeoCard"
import PageIndicator from "../molecules/PageIndicator"
import SliderButton from "../atoms/SliderButton"

// CEO 이미지 import
import steveJobsImg from "../../assets/ceos/SteveJobs.png"
import BillGatesImg from "../../assets/ceos/BillGates.png"
import elonMuskImg from "../../assets/ceos/ElonMusk.png"
import markZuckerbergImg from "../../assets/ceos/MarkZuckerberg.png"
import donaldTrumpImg from "../../assets/ceos/DonaldTrump.png"
import jensenHuangImg from "../../assets/ceos/JensenHuang.png"
import jeffreyBezosImg from "../../assets/ceos/JeffreyBezos.png"

// CEO 정보 타입 정의
type CeoInfo = {
  name: string;
  image: string;
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
  const [currentPage, setCurrentPage] = useState(0)
  
  // CEO 목록
  const ceoList: CeoInfo[] = [
    {
      name: "스티브 잡스",
      image: steveJobsImg,
      description: ["혁신적인 마케팅과 프로젝트 실행력의 대명사"],
      effects: {
        positive: ["마케팅 보상 1.2배", "프로젝트 보상 1.2배"],
        negative: ["노조 파업 확률 2배"]
      }
    },
    {
      name: "빌 게이츠",
      image: BillGatesImg,
      description: ["기술 혁신과 전략적 특허 투자의 선구자"],
      effects: {
        positive: ["R&D 투자 보상 1.3배", "특허 등록 성공 확률 2배", "리스크 투자 확률 2.5배"],
        negative: []
      }
    },
    {
      name: "일론 머스크",
      image: elonMuskImg,
      description: ["압도적인 생산성과 위험한 도전 정신의 소유자"],
      effects: {
        positive: ["턴당 생산량 1.5배", "리스크 투자 확률 1.5배"],
        negative: ["CEO 리스크 2배"]
      }
    },
    {
      name: "마크 주커버그",
      image: markZuckerbergImg,
      description: ["소셜 미디어와 마케팅 전략의 천재"],
      effects: {
        positive: ["마케팅 보상 1.3배"],
        negative: ["고용 비용 1.2배"]
      }
    },
    {
      name: "도날드 트럼프",
      image: donaldTrumpImg,
      description: ["화제성과 미디어 활용의 달인, 자본력 보유"],
      effects: {
        positive: ["초기자본 2배", "바이럴 이벤트 효과 3배", "마케팅 보상 1.3배"],
        negative: []
      }
    },
    {
      name: "젠슨 황",
      image: jensenHuangImg,
      description: ["AI와 GPU 기술 혁신의 선두주자"],
      effects: {
        positive: ["R&D 투자 보상 1.5배", "GPU/AI 이벤트 보상 2배"],
        negative: []
      }
    },
    {
      name: "제프 베이조스",
      image: jeffreyBezosImg,
      description: ["글로벌 확장과 효율적인 마케팅의 대가"],
      effects: {
        positive: ["글로벌 프로젝트 보상 1.5배"],
        negative: ["마케팅 비용 0.8배"]
      }
    }
  ]

  const itemsPerPage = 3
  const totalPages = Math.ceil(ceoList.length / itemsPerPage)

  const getCurrentPageCeos = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return ceoList.slice(startIndex, endIndex)
  }

  const handleCeoSelect = (globalIndex: number) => {
    setSelectedCeo(globalIndex)
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const gameDataStore = useGameDataStore()

  const handleConfirm = () => {
    if (selectedCeo !== null) {
      gameDataStore.setSelectedCeo(selectedCeo)
      console.log(`Selected CEO: ${ceoList[selectedCeo].name}`)
      onCeoSelect?.()
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-6">
      <div className="flex flex-col items-center w-full max-w-6xl">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-black mb-4">CEO 선택</h1>
          <p className="text-lg text-black">당신의 회사를 이끌 CEO를 선택하세요</p>
        </div>

        {/* CEO 카드 슬라이더 */}
        <div className="relative w-full max-w-6xl mb-8">
          {/* 이전 버튼 */}
          <SliderButton 
            direction="left" 
            onClick={handlePrevPage} 
            disabled={totalPages <= 1} 
          />

          {/* CEO 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-16">
            {getCurrentPageCeos().map((ceo, localIdx) => {
              const globalIdx = currentPage * itemsPerPage + localIdx
              return (
                <div key={globalIdx} className="min-w-0 w-full">
                  <CeoCard
                    ceo={ceo}
                    isSelected={selectedCeo === globalIdx}
                    onClick={() => handleCeoSelect(globalIdx)}
                  />
                </div>
              )
            })}
          </div>

          {/* 다음 버튼 */}
          <SliderButton 
            direction="right" 
            onClick={handleNextPage} 
            disabled={totalPages <= 1} 
          />
        </div>

        {/* 페이지 인디케이터 */}
        <PageIndicator 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* 확인 버튼 */}
        <CeoSelectButton
          maxSize={700}
          className={`
            w-1/4 block font-extrabold text-white px-4 py-3 rounded transition-colors
            ${selectedCeo !== null
              ? 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
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
