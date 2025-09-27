import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { useUserStore } from '../../stores/userStore'
import { useSaveStore } from '../../stores/saveStore'
import { useButtonStore } from '../../stores/buttonStore'
import { useGameDataStore } from '../../stores/gameDataStore'
import { defaultSave } from '../../stores/saveStore'
import { getRandomHiringArray, getRandomUniqueArray } from '../../hooks/CreateRandomArray' // 랜덤 배열 함수
import Logo from "../atoms/Logo"
import GameDataInformation from "../molecules/GameDataInformation"
import Button from "../atoms/Button"
import hintIcon from "../../assets/icons/help.png"

const logoHeight = 48; // 로고 이미지 세로 사이즈
const storeButtonSize = 100; // 스토어 버튼 최대 사이즈
const turnEndButtonSize = 100; // 턴 종료 버튼 최대 사이즈
const logoutButtonSize = 100; // 로그아웃 버튼 사이즈

const RANDOM_EVENT_PROBABILITY = 0.25 // 랜덤 이벤트 확률
const MAX_TURN = 30 // 게임의 종료 턴

type InformationBarProps = {
  onRandomEvent: () => void
  onStore: () => void
  onCloseAllModals?: () => void // 모든 모달을 닫는 함수
}

// 정보 바
function InformationBar({ onRandomEvent, onStore, onCloseAllModals }: InformationBarProps) {
  const navigate = useNavigate()
  const saveStore = useSaveStore()
  const buttonStore = useButtonStore()
  const gameDataStore = useGameDataStore()
  const { isLoggedIn, user: _user, clearUser } = useUserStore()
  const currentSaveIdx = saveStore.currentSaveIdx
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasRandomEvent, setHasRandomEvent] = useState(false)
  const [showHintModal, setShowHintModal] = useState(false)

  const productivityBonus = Math.floor(useGameDataStore(state => state.productivity) / 500) / 10 + 1
  
  // CEO 정보 가져오기
  const selectedCeoIndex = gameDataStore.selectedCeo
  const CeoNames = [
    "재 드래곤",
    "밀 게이츠",
    "멜론 머스크",
    "마크 주커버거",
    "도널드 트럼펫",
    "젤리 황",
    "제프 베이주스",
    "스티브 잡아스"
  ]
  
  const CeoEffects = [
    {
      positive: ["투자 보상 1.1배", "마케팅 보상 1.1배", "프로젝트 보상 1.1배"],
      negative: ["랜덤 이벤트 부정적 효과 1.1배"]
    },
    {
      positive: ["투자 보상 1.2배", "생산성 증가 1.2배"],
      negative: ["랜덤 이벤트 부정적 효과 1.2배"]
    },
    {
      positive: ["생산성 보상 1.5배"],
      negative: ["랜덤 이벤트 부정적 효과 2배"]
    },
    {
      positive: ["마케팅 비용 0.8배", "마케팅 보상 1.3배"],
      negative: ["고용 비용 1.2배"]
    },
    {
      positive: ["마케팅 보상 1.3배", "고용, 마케팅, 투자, 프로젝트 비용 0.8배"],
      negative: ["생산성 보상 0.5배"]
    },
    {
      positive: ["투자 보상 1.5배"],
      negative: ["프로젝트 보상 0.8배"]
    },
    {
      positive: ["프로젝트 보상 1.5배"],
      negative: ["마케팅 비용 1.2배"]
    },
    {
      positive: ["마케팅 보상 1.5배"],
      negative: ["생산성 증가 0.8배"]
    }
  ]
  
  const currentCeoName = selectedCeoIndex !== null ? CeoNames[selectedCeoIndex] : "미선택"
  const currentCeoEffects = selectedCeoIndex !== null ? CeoEffects[selectedCeoIndex] : { positive: [], negative: [] }


  // 턴 종료 버튼 누를 시 이벤트
  const handleTurnEnd = () => {
    // 모든 모달 닫기
    if (onCloseAllModals) {
      onCloseAllModals()
    }
    
    // 턴 전환 애니메이션 시작
    setIsTransitioning(true)
    
    // 애니메이션 지연 후 실제 턴 종료 로직 실행
    setTimeout(() => {
    const projectNextTurn = gameDataStore.currentProject.turn - 1 // 프로젝트 턴 수 1 감소


    // 프로젝트 완료 시
    if (projectNextTurn <= 0) {
      gameDataStore.setFinance(gameDataStore.finance + gameDataStore.currentProject.reward * productivityBonus)
      const newProject = {
        name: "",
        turn: 0,
        reward: 0,
      }
      gameDataStore.setCurrentProject(newProject)
      buttonStore.setProjectButton(true)
    } else {
      const newProject = {
        name: gameDataStore.currentProject.name,
        turn: gameDataStore.currentProject.turn - 1,
        reward: gameDataStore.currentProject.reward
      }
      gameDataStore.setCurrentProject(newProject)
    }

    // 버튼 선택 여부 초기화
    buttonStore.setHiringButton(true)
    buttonStore.setMarketingButton(true)
    buttonStore.setInvestmentButton(true)

    // 각 액션 데이터 랜덤하게 변경
    gameDataStore.setHiringArray(getRandomHiringArray(gameDataStore.hiringArray, 0, 14))
    gameDataStore.setMarketingArray(getRandomUniqueArray(3, 0, 4))
    gameDataStore.setInvestmentArray(getRandomUniqueArray(2, 0, 14))
    gameDataStore.setProjectArray(getRandomUniqueArray(3, 0, 7))
    

    // gameDataStore 갱신
    const latestData = {
      enterpriseValue: gameDataStore.enterpriseValue,
      productivity: gameDataStore.productivity,
      finance: gameDataStore.finance,
      employeeCount: gameDataStore.employeeCount,
      turn: gameDataStore.turn + 1,
      currentProject: gameDataStore.currentProject,
      officeLevel: gameDataStore.officeLevel,
      // 업그레이드 레벨들 추가
      commuteBusLevel: gameDataStore.commuteBusLevel,
      dormitoryLevel: gameDataStore.dormitoryLevel,
      gymLevel: gameDataStore.gymLevel,
      cafeteriaLevel: gameDataStore.cafeteriaLevel,
      hospitalLevel: gameDataStore.hospitalLevel,
      daycareLevel: gameDataStore.daycareLevel,
      bookCafeLevel: gameDataStore.bookCafeLevel,
      buildingLevel: gameDataStore.buildingLevel,
      updatedAt: new Date().toISOString().split("T")[0],
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
    
    // 종료 턴 도달 시
    if (gameDataStore.turn === MAX_TURN) {
      saveStore.setSave(currentSaveIdx, defaultSave)
      navigate("/ending")
      return
    } else {
      gameDataStore.setTurn(gameDataStore.turn + 1)
      console.log('턴 종료 전 데이터:', {
        buildingLevel: gameDataStore.buildingLevel,
        officeLevel: gameDataStore.officeLevel
      });
      console.log('저장할 latestData:', latestData);
      saveStore.setSave(currentSaveIdx, latestData)
      console.log('턴 종료 후 저장 완료');
      
      // 랜덤 이벤트 발생 확률 체크
      const randomEventProbability = Math.random()
      console.log('랜덤 이벤트 확률:', randomEventProbability, '임계값:', RANDOM_EVENT_PROBABILITY)
      
      if (randomEventProbability < RANDOM_EVENT_PROBABILITY) {
        console.log('랜덤 이벤트 발생!')
        setHasRandomEvent(true)
        onRandomEvent()
        
        // 이벤트가 끝나는 것을 감지하기 위해 주기적으로 체크
        const eventCheckInterval = setInterval(() => {
          // 이벤트 모달이 닫힘에따라 hasRandomEvent가 false가 되거나
          // 또는 DOM에서 이벤트 관련 요소가 사라졌을 때 전환 상태 해제
          if (!hasRandomEvent) {
            console.log('이벤트 종료 감지, 전환 상태 해제')
            setIsTransitioning(false)
            clearInterval(eventCheckInterval)
          }
        }, 500) // 0.5초마다 체크
        
        // 최대 10초 후 강제 해제 (백업)
        setTimeout(() => {
          console.log('이벤트 최대 대기시간 초과, 강제 해제')
          setIsTransitioning(false)
          setHasRandomEvent(false)
          clearInterval(eventCheckInterval)
        }, 10000)
        
      } else {
        console.log('랜덤 이벤트 발생 안함')
        // 이벤트가 없으면 바로 애니메이션 종료
        setIsTransitioning(false)
      }
    }
    }, 800) // 0.8초 후 실행
  }


  // 로그아웃 기능
  const handleLogout = async () => {
    try {
      await authApi.logout()
      clearUser()
      localStorage.removeItem('growit-auth-data')
      localStorage.removeItem('growit-user-storage')
      
      alert('로그아웃 되었습니다.')
      window.location.href = '/' 
    } catch (error) {
      console.error('로그아웃 오류:', error)
      clearUser()
      localStorage.removeItem('growit-auth-data')
      localStorage.removeItem('growit-user-storage')
      alert('로그아웃 되었습니다.')
      window.location.href = '/'
    }
  }

  // 회원탈퇴 기능
  const handleWithdraw = async () => {
    const confirmWithdraw = confirm('정말 회원탈퇴하시겠습니까?')
    if (!confirmWithdraw) return
    try {
      await authApi.withdraw()
      clearUser()
      localStorage.clear()
      alert('회원탈퇴가 완료되었습니다.')
      window.location.href = '/'
    } catch (error) {
      console.error('회원탈퇴 오류:', error)
      clearUser()
      localStorage.clear()
      alert('회원탈퇴 처리 중 오류가 발생했지만, 로컬 데이터는 삭제되었습니다.')
      window.location.href = '/'
    }
  }

  return (
    <>
      {/* 턴 종료 시 로딩 오버레이 */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-80 animate-pulse" />
          
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
      
      <header className="h-16 flex items-center justify-between px-4 bg-cover bg-center bg-zinc-300">
        {/* 로고 이미지 */}
        <div className="flex items-center gap-3">
          <Logo height={logoHeight} />
          {/* Hint 아이콘 */}
          <button
            className="hover:bg-blue-100 transition-colors p-2 rounded inline-flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setShowHintModal(true)}
            onMouseLeave={() => setShowHintModal(false)}
          >
            <img src={hintIcon} alt="도움말" className="w-8 h-8" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* 게임 데이터 표시 */}
          <GameDataInformation MAX_TURN={MAX_TURN} />
          {/* 스토어, 턴 종료, 로그아웃, 회원탈퇴 버튼 */}
          <div className='flex items-center gap-2'>
            {/* 스토어 버튼 */}
            <Button
              maxSize={storeButtonSize}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors"
              onClick={onStore}
            >
              스토어
            </Button>
            {/* 턴 종료 버튼 */}
            <Button
              maxSize={turnEndButtonSize}
              className={`bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
                isTransitioning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
              }`}
              onClick={handleTurnEnd}
              disabled={isTransitioning}
            >
              {isTransitioning ? '전환 중...' : '턴 종료'}
            </Button>
            {/* 로그인 상태일 때만 로그아웃/회원탈퇴 버튼 표시 */}
            {isLoggedIn && (
              <div className="flex items-center gap-2">
                <Button
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-red-500 text-red-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
                <Button
                  maxSize={logoutButtonSize}
                  className="bg-transparent border-2 border-orange-500 text-orange-500 px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-700 hover:text-white transition-colors"
                  onClick={handleWithdraw}
                >
                  회원탈퇴
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Hint 모달 */}
      {showHintModal && (
        <div 
          className="absolute top-10 left-4 z-50 w-96 max-h-[80vh] overflow-y-auto"
          style={{
            background: 'linear-gradient(to bottom, #f4e4c1, #e8d7b5)',
            border: '3px solid #8b7355',
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 0 60px rgba(139,115,85,0.1)',
          }}
          onMouseEnter={() => setShowHintModal(true)}
          onMouseLeave={() => setShowHintModal(false)}
        >
          {/* 양피지 텍스처 효과 */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,115,85,0.3) 2px, rgba(139,115,85,0.3) 4px)',
            }}
          />
          
          <div className="relative p-6 space-y-4">
            {/* 제목 */}
            <div className="text-center border-b-2 border-[#8b7355] pb-3 mb-4">
              <h2 className="text-2xl font-bold text-[#5c4a3a]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                GrowIT 게임 가이드
              </h2>
            </div>
            
            {/* 컨텐츠 */}
            <div className="space-y-3 text-[#3a2f23]">
              {/* CEO 정보*/}
              <div className="bg-[#fff9e6] bg-opacity-80 p-3 rounded border-l-4 border-[#d4a574]">
                <p className="font-bold text-base mb-2 text-[#8b7355]">선택한 CEO</p>
                <p className="text-sm ml-3 font-semibold text-[#5c4a3a] mb-2">{currentCeoName}</p>
                
                {currentCeoEffects.positive.length > 0 && (
                  <div className="ml-3 mb-1">
                    <p className="text-xs font-semibold text-green-700">보너스:</p>
                    {currentCeoEffects.positive.map((effect, idx) => (
                      <p key={idx} className="text-xs ml-2 text-green-600">• {effect}</p>
                    ))}
                  </div>
                )}
                
                {currentCeoEffects.negative.length > 0 && (
                  <div className="ml-3">
                    <p className="text-xs font-semibold text-red-700">리스크:</p>
                    {currentCeoEffects.negative.map((effect, idx) => (
                      <p key={idx} className="text-xs ml-2 text-red-600">• {effect}</p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-[#fff9e6] bg-opacity-60 p-3 rounded border-l-4 border-[#8b7355]">
                <p className="font-bold text-base mb-1">게임 목표</p>
                <p className="text-sm ml-3">• 30턴 동안 회사를 성장시키세요</p>
                <p className="text-sm ml-3 text-red-700 font-semibold">• 자산 0원 = 파산!</p>
              </div>

              <div className="bg-[#fff9e6] bg-opacity-60 p-3 rounded border-l-4 border-[#8b7355]">
                <p className="font-bold text-base mb-1">핵심 지표</p>
                <p className="text-sm ml-3">자산 / 기업가치 / 생산성</p>
              </div>

              <div className="bg-[#fff9e6] bg-opacity-60 p-3 rounded border-l-4 border-[#8b7355]">
                <p className="font-bold text-base mb-1">매 턴 행동</p>
                <p className="text-sm ml-3"><span className="text-green-700 font-semibold">생산성 ↑</span> : 고용, 투자</p>
                <p className="text-sm ml-3"><span className="text-blue-700 font-semibold">기업가치 ↑</span> : 마케팅, 프로젝트</p>
              </div>

              <div className="bg-[#fff9e6] bg-opacity-60 p-3 rounded border-l-4 border-[#8b7355]">
                <p className="font-bold text-base mb-1">랜덤 이벤트</p>
                <p className="text-sm ml-3">턴 종료마다 특별 이벤트 발생 가능</p>
              </div>

              <div className="bg-[#fff9e6] bg-opacity-60 p-3 rounded border-l-4 border-[#8b7355]">
                <p className="font-bold text-base mb-1">스토어</p>
                <p className="text-sm ml-3">• 복지시설 업그레이드</p>
                <p className="text-sm ml-3">• 통근버스 → 건물 (Lv1~3)</p>
                <p className="text-sm ml-3 text-orange-700 font-semibold">• 건물 업그레이드 시 UI 변경!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InformationBar