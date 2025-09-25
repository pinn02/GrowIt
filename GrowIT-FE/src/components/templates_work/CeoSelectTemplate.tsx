import { useState } from "react"
import { useGameDataStore } from "../../stores/gameDataStore"
import CeoSelectButton from "../atoms/Button"
import CeoCard from "../molecules/CeoCard"
import PageIndicator from "../molecules/PageIndicator"
import SliderButton from "../atoms/SliderButton"

// CEO 이미지 import
import BillGatesImg from "../../assets/ceos/BillGates.png"
import elonMuskImg from "../../assets/ceos/ElonMusk.png"
import markZuckerbergImg from "../../assets/ceos/MarkZuckerberg.png"
import donaldTrumpImg from "../../assets/ceos/DonaldTrump.png"
import jensenHuangImg from "../../assets/ceos/JensenHuang.png"
import jeffreyBezosImg from "../../assets/ceos/JeffreyBezos.png"
import steveJobsImg from "../../assets/ceos/SteveJobs.png"

import { useSaveStore } from "../../stores/saveStore"
import { defaultSave } from "../../stores/saveStore"

export const CeoNames = [
  "빌 게이츠",
  "일론 머스크",
  "마크 주커버그",
  "도날드 트럼프",
  "젠슨 황",
  "제프 베이조스",
  "스티브 잡스"
]

// CEO 정보 타입 정의
type CeoInfo = {
  name: string;
  image: string;
  description: string[];
  effects: {
    positive: string[];
    negative: string[];
  };
  ceoEffectData: {
    hiringInput: number
    hiringOutput: number
    marketingInput: number
    marketingOutput: number
    investmentInput: number
    investmentOutput: number
    projectInput: number
    projectOutput: number
    goodRandomEventEnterpriseValue: number
    goodRandomEventProductivity: number
    goodRandomEventFinance: number
    badRandomEventEnterpriseValue: number
    badRandomEventProductivity: number
    badRandomEventFinance: number
  }
}

const defaultCeoEffectData = {
  hiringInput: 1,
  hiringOutput: 1,
  marketingInput: 1,
  marketingOutput: 1,
  investmentInput: 1,
  investmentOutput: 1,
  projectInput: 1,
  projectOutput: 1,
  goodRandomEventEnterpriseValue: 1,
  goodRandomEventProductivity: 1,
  goodRandomEventFinance: 1,
  badRandomEventEnterpriseValue: 1,
  badRandomEventProductivity: 1,
  badRandomEventFinance: 1,
}

type CeoSelectTemplateProps = {
  onCeoSelect?: () => void;
}

function CeoSelectTemplate({ onCeoSelect }: CeoSelectTemplateProps) {
  const [selectedCeo, setSelectedCeo] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  const gameDataStore = useGameDataStore()
  const saveStore = useSaveStore()
  
  // CEO 목록
  const ceoList: CeoInfo[] = [
    {
      name: CeoNames[0],
      image: BillGatesImg,
      description: ["기술 혁신과 전략적 특허 투자의 선구자"],
      effects: {
        positive: ["투자 보상 1.2배", "생산성 증가 1.2배"],
        negative: ["랜덤 이벤트 부정적 효과 1.2배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        investmentOutput: 1.2,
        hiringOutput: 1.2,
        goodRandomEventProductivity: 1.2,
        badRandomEventEnterpriseValue: 1.2,
        badRandomEventFinance: 1.2,
        badRandomEventProductivity: 1.2,
      }
    },
    {
      name: CeoNames[1],
      image: elonMuskImg,
      description: ["압도적인 생산성과 위험한 도전 정신의 소유자"],
      effects: {
        positive: ["생산성 보상 1.5배"],
        negative: ["랜덤 이벤트 부정적 효과 2배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        hiringOutput: 1.5,
        goodRandomEventProductivity: 1.5,
        badRandomEventEnterpriseValue: 2,
        badRandomEventFinance: 2,
        badRandomEventProductivity: 2,
      }
    },
    {
      name: CeoNames[2],
      image: markZuckerbergImg,
      description: ["소셜 미디어와 마케팅 전략의 천재"],
      effects: {
        positive: ["마케팅 비용 0.8배", "마케팅 보상 1.3배"],
        negative: ["고용 비용 1.2배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        marketingInput: 0.8,
        marketingOutput: 1.3,
        hiringInput: 1.2
      }
    },
    {
      name: CeoNames[3],
      image: donaldTrumpImg,
      description: ["화제성과 미디어 활용의 달인, 자본력 보유"],
      effects: {
        positive: ["마케팅 보상 1.3배", "고용, 마케팅, 투자, 프로젝트 비용 0.8배"],
        negative: ["생산성 보상 0.5배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        marketingOutput: 1.3,
        hiringInput: 0.8,
        marketingInput: 0.8,
        investmentInput: 0.8,
        projectInput: 0.8,
        hiringOutput: 0.5,
      }
    },
    {
      name: CeoNames[4],
      image: jensenHuangImg,
      description: ["AI와 GPU 기술 혁신의 선두주자"],
      effects: {
        positive: ["투자 보상 1.5배"],
        negative: ["프로젝트 보상 0.8배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        investmentOutput: 1.5,
        projectOutput: 0.8,
      }
    },
    {
      name: CeoNames[5],
      image: jeffreyBezosImg,
      description: ["글로벌 확장과 효율적인 마케팅의 대가"],
      effects: {
        positive: ["프로젝트 보상 1.5배"],
        negative: ["마케팅 비용 1.2배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        projectOutput: 1.5,
        marketingInput: 1.2
      }
    },
    {
      name: CeoNames[6],
      image: steveJobsImg,
      description: ["혁신적인 마케팅과 프로젝트 실행력의 대명사"],
      effects: {
        positive: ["마케팅 보상 1.5배"],
        negative: ["생산성 증가 0.8배"]
      },
      ceoEffectData: {
        ...defaultCeoEffectData,
        marketingOutput: 1.5,
        hiringOutput: 0.8,
        goodRandomEventProductivity: 0.8,
      }
    },
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

  const handleConfirm = () => {
    if (selectedCeo !== null) {
      gameDataStore.setSelectedCeo(selectedCeo)
      console.log(`Selected CEO: ${ceoList[selectedCeo].name}`)

      onCeoSelect?.()

      const currentCeo = ceoList[selectedCeo]

      const newSave = {
        ...defaultSave,
        turn: 1,
        ...currentCeo.ceoEffectData
      }

      const currentSaveIdx = saveStore.currentSaveIdx

      saveStore.setSave(currentSaveIdx, newSave)

      gameDataStore.setEnterpriseValue(newSave.enterpriseValue)
      gameDataStore.setProductivity(newSave.productivity)
      gameDataStore.setFinance(newSave.finance)
      gameDataStore.setEmployeeCount(newSave.employeeCount)
      gameDataStore.setTurn(newSave.turn)
      gameDataStore.setCurrentProject(newSave.currentProject)
      gameDataStore.setOfficeLevel(newSave.officeLevel)

      // 효과 데이터도 적용
      gameDataStore.setHiringInput(newSave.hiringInput)
      gameDataStore.setHiringOutput(newSave.hiringOutput)
      gameDataStore.setMarketingInput(newSave.marketingInput)
      gameDataStore.setMarketingOutput(newSave.marketingOutput)
      gameDataStore.setInvestmentInput(newSave.investmentInput)
      gameDataStore.setInvestmentOutput(newSave.investmentOutput)
      gameDataStore.setProjectInput(newSave.projectInput)
      gameDataStore.setProjectOutput(newSave.projectOutput)
      gameDataStore.setGoodRandomEventEnterpriseValue(newSave.goodRandomEventEnterpriseValue)
      gameDataStore.setGoodRandomEventProductivity(newSave.goodRandomEventProductivity)
      gameDataStore.setGoodRandomEventFinance(newSave.goodRandomEventFinance)
      gameDataStore.setBadRandomEventEnterpriseValue(newSave.badRandomEventEnterpriseValue)
      gameDataStore.setBadRandomEventProductivity(newSave.badRandomEventProductivity)
      gameDataStore.setBadRandomEventFinance(newSave.badRandomEventFinance)
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
          to="/main"
        >
          {selectedCeo !== null ? `${ceoList[selectedCeo].name} 선택` : 'CEO를 선택하세요'}
        </CeoSelectButton>
      </div>
    </div>
  )
}

export default CeoSelectTemplate
