import CloseButton from "../atoms/Button";
import UpgradeButton from "../atoms/Button";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useSaveStore } from "../../stores/saveStore";
import { useState } from "react";

import upgradedBus1 from "../../assets/upgrades/upgraded_bus1.png";
import upgradedBus2 from "../../assets/upgrades/upgraded_bus2.png";
import upgradedBus3 from "../../assets/upgrades/upgraded_bus3.png";
import upgradedBuilding1 from "../../assets/upgrades/upgraded_building1.png";
import upgradedBuilding2 from "../../assets/upgrades/upgraded_building2.png";
import upgradedBuilding3 from "../../assets/upgrades/upgraded_building3.png";

// 업그레이드 타입 정의
type UpgradeType = 'commuteBus' | 'dormitory' | 'gym' | 'cafeteria' | 'hospital' | 'daycare' | 'bookCafe' | 'building';

// 기본 업그레이드 정보 타입
interface BaseUpgradeInfo {
  name: string;
  icons: string[];
  maxLevel: number;
  costs: number[];
  description: string;
}

// 생산성 보너스가 있는 업그레이드
interface ProductivityUpgradeInfo extends BaseUpgradeInfo {
  productivityBonus: number[];
}

// 기업가치 보너스가 있는 업그레이드
interface EnterpriseValueUpgradeInfo extends BaseUpgradeInfo {
  enterpriseValueBonus: number[];
}

// 건물 업그레이드 
interface BuildingUpgradeInfo extends BaseUpgradeInfo {
  enterpriseValueRequirements: number[];
  enterpriseValueBonus: number[];
}

// 모든 업그레이드 정보 타입의 유니온
type UpgradeInfo = ProductivityUpgradeInfo | EnterpriseValueUpgradeInfo | BuildingUpgradeInfo;

// 타입 가드 함수들
function hasProductivityBonus(info: UpgradeInfo): info is ProductivityUpgradeInfo {
  return 'productivityBonus' in info;
}

function hasEnterpriseValueBonus(info: UpgradeInfo): info is EnterpriseValueUpgradeInfo {
  return 'enterpriseValueBonus' in info;
}

function hasBuildingRequirements(info: UpgradeInfo): info is BuildingUpgradeInfo {
  return 'enterpriseValueRequirements' in info;
}

// 업그레이드 정보 정의
const UPGRADE_INFO: Record<UpgradeType, UpgradeInfo> = {
  commuteBus: {
    name: '통근버스',
    icons: [upgradedBus1, upgradedBus2, upgradedBus3], 
    maxLevel: 3,
    costs: [10000, 20000, 30000],
    productivityBonus: [10, 20, 30],
    description: '직원들의 통근 편의성을 향상시킵니다'
  },
  dormitory: {
    name: '기숙사',
    icons: ['🏠', '🏘️', '🏢'],
    maxLevel: 3,
    costs: [50000, 100000, 150000],
    enterpriseValueBonus: [50, 100, 150],
    description: '직원들의 주거 환경을 개선합니다'
  },
  gym: {
    name: '사내 헬스장',
    icons: ['💪', '🏃', '🏋️'],
    maxLevel: 3,
    costs: [15000, 30000, 45000],
    productivityBonus: [15, 30, 45],
    description: '직원들의 건강과 업무 효율을 높입니다'
  },
  cafeteria: {
    name: '카페테리아',
    icons: ['🍽️', '🍜', '🍱'],
    maxLevel: 3,
    costs: [30000, 60000, 90000],
    enterpriseValueBonus: [30, 60, 90],
    description: '직원들의 식사 환경을 개선합니다'
  },
  hospital: {
    name: '병원',
    icons: ['🏥', '⛑️', '🚑'],
    maxLevel: 3,
    costs: [20000, 40000, 60000],
    productivityBonus: [20, 40, 60],
    description: '직원들의 의료 서비스를 제공합니다'
  },
  daycare: {
    name: '어린이집',
    icons: ['👶', '🧸', '🎠'],
    maxLevel: 3,
    costs: [40000, 80000, 120000],
    enterpriseValueBonus: [40, 80, 120],
    description: '직원들의 육아 부담을 덜어줍니다'
  },
  bookCafe: {
    name: '북카페',
    icons: ['📚', '☕', '📖'],
    maxLevel: 3,
    costs: [12000, 25000, 40000],
    productivityBonus: [12, 25, 40],
    description: '직원들의 휴식과 자기계발을 돕습니다'
  },
  building: {
    name: '건물 업그레이드',
    icons: [upgradedBuilding1, upgradedBuilding2, upgradedBuilding3, upgradedBuilding3],
    maxLevel: 4,
    costs: [100000, 200000, 300000, 500000],
    enterpriseValueRequirements: [100, 300, 500, 700], 
    enterpriseValueBonus: [10, 20, 30, 50],
    description: '회사 건물 자체를 업그레이드합니다'
  }
};

const UPGRADE_ORDER: UpgradeType[] = [
  'commuteBus', 'dormitory', 'gym', 'cafeteria', 'hospital', 'daycare', 'bookCafe', 'building'
];

type StoreModalProps = {
  onClose: () => void;
};

function StoreModal({ onClose }: StoreModalProps) {
  const gameDataStore = useGameDataStore();
  const saveStore = useSaveStore();
  
  const [, forceUpdate] = useState({});
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  // 게임 스토어에서 업그레이드 레벨 가져오기
  const upgradeLevels: Record<UpgradeType, number> = {
    commuteBus: gameDataStore.commuteBusLevel,
    dormitory: gameDataStore.dormitoryLevel,
    gym: gameDataStore.gymLevel,
    cafeteria: gameDataStore.cafeteriaLevel,
    hospital: gameDataStore.hospitalLevel,
    daycare: gameDataStore.daycareLevel,
    bookCafe: gameDataStore.bookCafeLevel,
    building: gameDataStore.buildingLevel
  };
  
  // 현재 업그레이드 레벨 상태 확인
  
  const triggerRerender = () => {
    forceUpdate({});
  };

  const getCurrentUpgrade = (): UpgradeType | null => {
    const minLevel = Math.min(...Object.values(upgradeLevels));
    // 현재 레벨 상태 및 최소 레벨 확인
    
    for (const upgradeType of UPGRADE_ORDER) {
      if (upgradeLevels[upgradeType] === minLevel && upgradeLevels[upgradeType] < UPGRADE_INFO[upgradeType].maxLevel) {
        // 현재 업그레이드 대상 및 레벨 확인
        return upgradeType;
      }
    }
    
    return null; // 모든 업그레이드 완료
  };

  const currentUpgradeType = getCurrentUpgrade();

  // 업그레이드 가능 여부 확인
  const canUpgrade = (): boolean => {
    if (!currentUpgradeType) return false;
    
    const currentLevel = upgradeLevels[currentUpgradeType];
    const upgradeInfo = UPGRADE_INFO[currentUpgradeType];
    
    // 최대 레벨 확인
    if (currentLevel >= upgradeInfo.maxLevel) return false;
    
    // 건물 업그레이드의 경우 누적 기업 가치 확인
    if (currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo)) {
      const requiredValue = upgradeInfo.enterpriseValueRequirements[currentLevel - 1]; 
      if (gameDataStore.enterpriseValue < requiredValue) return false;
    }
    
    return true;
  };

  const hasEnoughMoney = (): boolean => {
    if (!currentUpgradeType) return false;
    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel - 1]; 
    return gameDataStore.finance >= cost;
  };

  // 업그레이드 실행
  const executeUpgrade = () => {
    if (!currentUpgradeType || !canUpgrade() || !hasEnoughMoney()) {
      // 업그레이드 실행 조건 미충족
      return;
    }

    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel - 1]; 

    // 업그레이드 실행 시작

    setIsUpgrading(true);

    setTimeout(() => {
      // 자본 차감
      gameDataStore.setFinance(gameDataStore.finance - cost);
      
      // 레벨 증가 - 게임 스토어 업데이트
      switch (currentUpgradeType) {
        case 'commuteBus':
          gameDataStore.setCommuteBusLevel(currentLevel + 1);
          break;
        case 'dormitory':
          gameDataStore.setDormitoryLevel(currentLevel + 1);
          break;
        case 'gym':
          gameDataStore.setGymLevel(currentLevel + 1);
          break;
        case 'cafeteria':
          gameDataStore.setCafeteriaLevel(currentLevel + 1);
          break;
        case 'hospital':
          gameDataStore.setHospitalLevel(currentLevel + 1);
          break;
        case 'daycare':
          gameDataStore.setDaycareLevel(currentLevel + 1);
          break;
        case 'bookCafe':
          gameDataStore.setBookCafeLevel(currentLevel + 1);
          break;
        case 'building':
          const newBuildingLevel = currentLevel + 1;
          gameDataStore.setBuildingLevel(newBuildingLevel);
          gameDataStore.setOfficeLevel(newBuildingLevel);
          // 건물 업그레이드 완료: 빌딩 레벨 및 오피스 레벨 동기화
          break;
      }
      
      // 업그레이드 후 새로운 레벨 설정 완료
      
      // 효과 적용
      const upgradeInfo = UPGRADE_INFO[currentUpgradeType];
      if (hasProductivityBonus(upgradeInfo)) {
        const bonus = upgradeInfo.productivityBonus[currentLevel - 1];
        gameDataStore.setProductivity(gameDataStore.productivity + bonus);
      }
      if (hasEnterpriseValueBonus(upgradeInfo) || hasBuildingRequirements(upgradeInfo)) {
        const bonus = hasEnterpriseValueBonus(upgradeInfo) 
          ? upgradeInfo.enterpriseValueBonus[currentLevel - 1]
          : (upgradeInfo as BuildingUpgradeInfo).enterpriseValueBonus[currentLevel - 1];
        gameDataStore.setEnterpriseValue(gameDataStore.enterpriseValue + bonus);
      }

      setTimeout(() => {
        setIsUpgrading(false);
        triggerRerender(); // 리렌더링 강제
        
        // 업그레이드 후 세이브 데이터 업데이트
        const currentSaveIdx = saveStore.currentSaveIdx;
        const currentSave = saveStore.saves[currentSaveIdx];
        const updatedSave = {
          ...currentSave,
          enterpriseValue: gameDataStore.enterpriseValue,
          productivity: gameDataStore.productivity,
          finance: gameDataStore.finance,
          employeeCount: gameDataStore.employeeCount,
          turn: gameDataStore.turn,
          currentProject: gameDataStore.currentProject,
          officeLevel: gameDataStore.officeLevel,
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
          updatedAt: new Date().toISOString().split("T")[0]
        };
        saveStore.setSave(currentSaveIdx, updatedSave);
        // 세이브 데이터 업데이트 완료
        
        // 모달을 자동으로 닫지 않고 사용자가 닫을 때까지 열어두기
        // onClose();
      }, 200); // 500ms에서 200ms로 단축
    }, 200);
  };

  if (!currentUpgradeType) {
    return (
      <div
        className="
          fixed
          inset-0
          w-full
          h-full
          flex
          justify-center
          items-center
          z-50
          bg-black/70
          backdrop-blur-sm
          animate-fadeIn
        "
        onClick={onClose}
      >
        <div
          className="
            relative
            w-[90%]
            max-w-lg
            bg-white
            rounded-2xl
            shadow-xl
            p-8
            transform
            transition-all
            duration-300
            scale-100
            pointer-events-auto
            border-4 border-green-400
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10">
            <CloseButton
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center font-bold shadow-lg"
            >
              ×
            </CloseButton>
          </div>

          <div className="w-full flex flex-col items-center">
            <h2 className="font-extrabold text-3xl text-center mb-4 text-gray-900">🎉 축하합니다!</h2>
            <p className="text-lg text-center text-green-600 font-semibold">
              모든 업그레이드를 완료했습니다!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const upgradeInfo = UPGRADE_INFO[currentUpgradeType];
  const currentLevel = upgradeLevels[currentUpgradeType];
  const cost = upgradeInfo.costs[currentLevel - 1]; 
  const canUpgradeThis = canUpgrade();
  const hasMoneyFor = hasEnoughMoney();

  let statusText = "";
  let statusColor = "";
  let buttonText = "레벨 " + (currentLevel + 1) + "로 업그레이드!";

  if (!canUpgradeThis) {
    if (currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo)) {
      const requiredValue = upgradeInfo.enterpriseValueRequirements[currentLevel - 1]; // 레벨이 1부터 시작하므로 -1
      const shortage = requiredValue - gameDataStore.enterpriseValue;
      statusText = `기업가치가 ${shortage.toLocaleString()} 부족합니다`;
      statusColor = "text-red-500";
      buttonText = "업그레이드 불가";
    }
  } else if (!hasMoneyFor) {
    const shortage = cost - gameDataStore.finance;
    statusText = `자금이 ${shortage.toLocaleString()}원 부족합니다`;
    statusColor = "text-red-500";
    buttonText = "자금 부족";
  }

  const currentIcon = upgradeInfo.icons[currentLevel - 1]; 
  
  // 아이콘이 이미지 경로인지 이모지인지 확인
  const isImageIcon = typeof currentIcon === 'string' && currentIcon.includes('.png'); 

  return (
    <>
      {isUpgrading && (
        <div className="fixed inset-0 flex justify-center items-center z-[100] pointer-events-none bg-black/70 backdrop-blur-sm">
          <div className="upgrade-success-animation animate-popIn">
            <p className="text-white text-4xl md:text-5xl font-extrabold animate-typewriter animate-flash animate-zoomIn">
              업그레이드 성공! 🎉
            </p>
          </div>
        </div>
      )}

      <div
        className="
          fixed
          inset-0
          w-full
          h-full
          flex
          justify-center
          items-center
          z-50
          bg-black/70
          backdrop-blur-sm
          animate-fadeIn
        "
        onClick={onClose}
      >
        <div
          className="
            relative
            w-[90%]
            max-w-lg
            bg-white
            rounded-2xl
            shadow-xl
            p-8
            transform
            transition-all
            duration-300
            scale-100
            pointer-events-auto
            border-4 border-blue-400
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10">
            <CloseButton
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center font-bold shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CloseButton>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[300px] h-[200px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg mb-6 flex items-center justify-center border-2 border-gray-300">
              {isImageIcon ? (
                <img 
                  src={currentIcon} 
                  alt={upgradeInfo.name}
                  className="w-48 h-40 object-contain animate-bounce-slow"
                />
              ) : (
                <div className="text-8xl animate-bounce-slow">
                  {currentIcon}
                </div>
              )}
            </div>

            <h2 className="font-extrabold text-2xl text-center mb-2 text-gray-900">
              {upgradeInfo.name}
            </h2>
            
            {/* 현재 진행도 */}
            <p className="text-base text-gray-600 mb-4">
              현재 진행도: <span className="font-bold text-blue-600">{currentLevel} / {upgradeInfo.maxLevel}</span>
            </p>

            {/* 업그레이드 버튼 */}
            {canUpgradeThis && hasMoneyFor ? (
              <UpgradeButton
                className="
                  w-full
                  bg-gradient-to-r from-amber-400 to-yellow-600
                  text-white
                  px-8
                  py-4
                  my-4
                  rounded-lg
                  shadow-xl
                  hover:shadow-amber-400/50
                  transition-all
                  duration-300
                  transform
                  hover:-translate-y-2
                  active:translate-y-0
                  focus:outline-none
                  focus:ring-4
                  focus:ring-amber-300
                  focus:ring-opacity-75
                  font-extrabold
                  text-xl
                  tracking-wide
                  animate-pulse
                "
                onClick={executeUpgrade}
              >
                🎉 {buttonText}
              </UpgradeButton>
            ) : (
              <button
                className="
                  w-full
                  bg-gray-400
                  text-white
                  px-8
                  py-4
                  my-4
                  rounded-lg
                  font-bold
                  text-xl
                  cursor-not-allowed
                  opacity-50
                "
                disabled
              >
                {buttonText}
              </button>
            )}

            {/* 비용 정보 */}
            <div className="text-center w-full">
              <p className="text-base text-gray-600 mb-2">
                자본: <span className="font-bold text-green-600">{cost.toLocaleString()}원</span>
              </p>
              
              {/* 추가 조건 표시 */}
              {currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo) && (
                <p className="text-sm text-gray-500 mb-2">
                  필요 기업가치: <span className="font-bold">{upgradeInfo.enterpriseValueRequirements[currentLevel - 1].toLocaleString()}</span>
                </p>
              )}

              {/* 보너스 효과 */}
              {hasProductivityBonus(upgradeInfo) && (
                <p className="text-sm text-blue-600">
                  생산성 +{upgradeInfo.productivityBonus[currentLevel - 1]}
                </p>
              )}
              {(hasEnterpriseValueBonus(upgradeInfo) || hasBuildingRequirements(upgradeInfo)) && (
                <p className="text-sm text-purple-600">
                  기업가치 +{hasEnterpriseValueBonus(upgradeInfo) 
                    ? upgradeInfo.enterpriseValueBonus[currentLevel - 1]
                    : (upgradeInfo as BuildingUpgradeInfo).enterpriseValueBonus[currentLevel - 1]}
                </p>
              )}

              {/* 상태 메시지 */}
              {statusText && (
                <p className={`text-sm ${statusColor} mt-2 font-semibold`}>
                  {statusText}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreModal;