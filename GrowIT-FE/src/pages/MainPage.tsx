import { useEffect, useState, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGameDataStore } from "../stores/gameDataStore"
import { defaultSave, useSaveStore } from "../stores/saveStore"
import type { SaveData } from "../stores/saveStore"
import InformationBar from "../components/organisms/InformationBar"
import HiringModal from "../components/organisms/HiringModal"
import MarketingModal from "../components/organisms/MarketingModal"
import InvestmentModal from "../components/organisms/InvestmentModal"
import ProjectModal from "../components/organisms/ProjectModal"
import RandomEventModal from "../components/organisms/RandomEventModal"
import StoreModal from "../components/organisms/StoreModal"
import StoryModal from "../components/organisms/StoryModal"
import MainTemplate from "../components/templates_work/MainTemplate"

function MainPage() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [activeRandomEventModal, setActiveRandomEventModal] = useState(false)
  const [activeStoreModal, setActiveStoreModal] = useState(false)
  const [showTurnTransition, setShowTurnTransition] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)

  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const finance = useGameDataStore(state => state.finance)
  const currentSaveIdx = saveStore.currentSaveIdx
  const gameDataStore = useGameDataStore()
  
  // 마지막 저장 시간을 추적하여 반복 저장 방지
  const lastSaveRef = useRef<string>('')

  // 자동 세이브 기능 - gameDataStore 변경 시 saveStore에 자동 저장
  const saveCurrentGame = useCallback(() => {
    if (gameDataStore.turn <= 0) return // 게임이 시작되지 않았으면 저장 안함
    
    const currentDate = new Date().toISOString().split("T")[0]
    
    const saveData: SaveData = {
      enterpriseValue: gameDataStore.enterpriseValue,
      productivity: gameDataStore.productivity,
      finance: gameDataStore.finance,
      employeeCount: gameDataStore.employeeCount,
      turn: gameDataStore.turn,
      currentProject: gameDataStore.currentProject,
      officeLevel: gameDataStore.officeLevel,
      updatedAt: currentDate,
      
      commuteBusLevel: gameDataStore.commuteBusLevel,
      dormitoryLevel: gameDataStore.dormitoryLevel,
      gymLevel: gameDataStore.gymLevel,
      cafeteriaLevel: gameDataStore.cafeteriaLevel,
      hospitalLevel: gameDataStore.hospitalLevel,
      daycareLevel: gameDataStore.daycareLevel,
      bookCafeLevel: gameDataStore.bookCafeLevel,
      buildingLevel: gameDataStore.buildingLevel,
      
      hiringArray: gameDataStore.hiringArray,
      marketingArray: gameDataStore.marketingArray,
      investmentArray: gameDataStore.investmentArray,
      projectArray: gameDataStore.projectArray,
      
      hiredPerson: gameDataStore.hiredPerson,
      
      hiringInput: gameDataStore.hiringInput,
      hiringOutput: gameDataStore.hiringOutput,
      marketingInput: gameDataStore.marketingInput,
      marketingOutput: gameDataStore.marketingOutput,
      investmentInput: gameDataStore.investmentInput,
      investmentOutput: gameDataStore.investmentOutput,
      projectInput: gameDataStore.projectInput,
      projectOutput: gameDataStore.projectOutput,
      goodRandomEventEnterpriseValue: gameDataStore.goodRandomEventEnterpriseValue,
      goodRandomEventProductivity: gameDataStore.goodRandomEventProductivity,
      goodRandomEventFinance: gameDataStore.goodRandomEventFinance,
      badRandomEventEnterpriseValue: gameDataStore.badRandomEventEnterpriseValue,
      badRandomEventProductivity: gameDataStore.badRandomEventProductivity,
      badRandomEventFinance: gameDataStore.badRandomEventFinance,
    }
    
    // 중복 저장 방지를 위한 체크
    const saveKey = `${gameDataStore.turn}-${gameDataStore.enterpriseValue}-${gameDataStore.finance}`
    if (lastSaveRef.current !== saveKey) {
      saveStore.setSave(currentSaveIdx, saveData)
      lastSaveRef.current = saveKey
      console.log('게임 자동 저장됨:', saveData.turn, '턴')
    }
  }, [gameDataStore, currentSaveIdx, saveStore])

  // 게임 데이터 변경 시 자동 세이브 트리거
  useEffect(() => {
    saveCurrentGame()
  }, [
    gameDataStore.enterpriseValue,
    gameDataStore.productivity,
    gameDataStore.finance,
    gameDataStore.turn,
    gameDataStore.employeeCount,
    gameDataStore.buildingLevel,
    gameDataStore.officeLevel,
    gameDataStore.commuteBusLevel,
    gameDataStore.dormitoryLevel,
    gameDataStore.gymLevel,
    gameDataStore.cafeteriaLevel,
    gameDataStore.hospitalLevel,
    gameDataStore.daycareLevel,
    gameDataStore.bookCafeLevel
    // saveCurrentGame 제거 - 무한 루프 방지
  ])

  // 스토리 모달 기능 - 세션 저장소 대신 게임 상태 기반으로 바꿈
  useEffect(() => {
    // 첫 번째 턴에서 스토리 모달을 보여준다
    if (gameDataStore.turn === 1) {
      setShowStoryModal(true)
    }
  }, [gameDataStore.turn])

  // 파산 기능
  useEffect(() => {
    if (finance < 0) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/bankruptcy")
    }
  }, [finance, navigate, saveStore, currentSaveIdx])

  // 스토리 모달 닫기 - sessionStorage 사용 제거
  const handleStoryClose = () => {
    setShowStoryModal(false)
  }

  // 액션 버튼 모달
  const toggleModal = (index: number) => {
    setActiveModal(prev => (prev === index ? null : index));
  }

  // 랜덤 이벤트 모달
  const handleRandomEventModal = () => {
    setActiveRandomEventModal(true)
  }

  // 이벤트 완료 후 턴 전환 애니메이션 표시
  const handleEventComplete = () => {
    setActiveRandomEventModal(false)
    setShowTurnTransition(true)
    setTimeout(() => {
      setShowTurnTransition(false)
    }, 1500)
  }

  // 스토어 모달
  const handleStoreModal = () => {
    setActiveStoreModal(true)
  }

  return (
    <>
      {/* 새턴 시작 오버레이 */}
      {showTurnTransition && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-90" />
          
          {/* 턴 전환 텍스트 */}
          <div className="relative z-10 text-center animate-turnTransition">
             <div className="text-4xl font-bold text-white mb-4 animate-pulse">
              GrowIT
            </div>
            
            {/* ... 장식 효과 */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      <InformationBar 
        onRandomEvent={handleRandomEventModal} 
        onStore={handleStoreModal}
        // onEventComplete={() => setShowTurnTransition(false)}
      />
      <MainTemplate openModal={toggleModal} />

      {/* 모달 켜기 */}
      {activeModal === 0 && <HiringModal onClose={() => setActiveModal(null)} />}
      {activeModal === 1 && <MarketingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 2 && <InvestmentModal onClose={() => setActiveModal(null)} />}
      {activeModal === 3 && <ProjectModal onClose={() => setActiveModal(null)} />}

      {activeRandomEventModal && <RandomEventModal onClose={handleEventComplete} />}
      {activeStoreModal && <StoreModal onClose={() => setActiveStoreModal(false)} />}
      {showStoryModal && <StoryModal onClose={handleStoryClose} />}
    </>
  )
}

export default MainPage