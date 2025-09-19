import CloseButton from "../atoms/Button";
import UpgradeButton from "../atoms/Button";
import officeUpgradeImage from "../../assets/images/office_upgrade.png";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useState } from "react";

// 업그레이드 타입 정의
type UpgradeType = 'commuteBus' | 'dormitory' | 'gym' | 'cafeteria' | 'hospital' | 'daycare' | 'bookCafe' | 'building';

// 업그레이드 정보 정의
const UPGRADE_INFO = {
  commuteBus: {
    name: '통근버스',
    icons: ['🚌', '🚍', '🚐'], // 레벨별 아이콘
    maxLevel: 3,
    costs: [50000, 100000, 150000],
    productivityBonus: [10, 20, 30],
    description: '직원들의 통근 편의성을 향상시킵니다'
  },
  dormitory: {
    name: '기숙사',
    icons: ['🏠', '🏘️', '🏢'],
    maxLevel: 3,
    costs: [100000, 200000, 300000],
    enterpriseValueBonus: [50, 100, 150],
    description: '직원들의 주거 환경을 개선합니다'
  },
  gym: {
    name: '사내 헬스장',
    icons: ['💪', '🏃', '🏋️'],
    maxLevel: 3,
    costs: [80000, 160000, 240000],
    productivityBonus: [15, 30, 45],
    description: '직원들의 건강과 업무 효율을 높입니다'
  },
  cafeteria: {
    name: '카페테리아',
    icons: ['🍽️', '🍜', '🍱'],
    maxLevel: 3,
    costs: [60000, 120000, 180000],
    enterpriseValueBonus: [30, 60, 90],
    description: '직원들의 식사 환경을 개선합니다'
  },
  hospital: {
    name: '병원',
    icons: ['🏥', '⛑️', '🚑'],
    maxLevel: 3,
    costs: [150000, 300000, 450000],
    productivityBonus: [20, 40, 60],
    description: '직원들의 의료 서비스를 제공합니다'
  },
  daycare: {
    name: '어린이집',
    icons: ['👶', '🧸', '🎠'],
    maxLevel: 3,
    costs: [120000, 240000, 360000],
    enterpriseValueBonus: [40, 80, 120],
    description: '직원들의 육아 부담을 덜어줍니다'
  },
  bookCafe: {
    name: '북카페',
    icons: ['📚', '☕', '📖'],
    maxLevel: 3,
    costs: [90000, 180000, 270000],
    productivityBonus: [12, 25, 40],
    description: '직원들의 휴식과 자기계발을 돕습니다'
  },
  building: {
    name: '건물 업그레이드',
    icons: ['🏢', '🏬', '🏭'],
    maxLevel: 3,
    costs: [500000, 1000000, 1500000],
    enterpriseValueRequirements: [1000, 2000, 3000], // 누적 기업 가치 요구사항
    enterpriseValueBonus: [200, 500, 800],
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
  const [upgradeLevels, setUpgradeLevels] = useState<Record<UpgradeType, number>>({
    commuteBus: 0,
    dormitory: 0,
    gym: 0,
    cafeteria: 0,
    hospital: 0,
    daycare: 0,
    bookCafe: 0,
    building: 0
  });
  const [isUpgrading, setIsUpgrading] = useState(false);

  // 현재 업그레이드 가능한 첫 번째 항목 찾기
  const getCurrentUpgrade = (): UpgradeType | null => {
    // 현재 최소 레벨 찾기
    const minLevel = Math.min(...Object.values(upgradeLevels));
    
    // 최소 레벨과 같은 레벨의 첫 번째 업그레이드 찾기
    for (const upgradeType of UPGRADE_ORDER) {
      if (upgradeLevels[upgradeType] === minLevel && upgradeLevels[upgradeType] < UPGRADE_INFO[upgradeType].maxLevel) {
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
    if (currentUpgradeType === 'building' && upgradeInfo.enterpriseValueRequirements) {
      const requiredValue = upgradeInfo.enterpriseValueRequirements[currentLevel];
      if (gameDataStore.enterpriseValue < requiredValue) return false;
    }
    
    return true;
  };

  // 자금 충분 여부 확인
  const hasEnoughMoney = (): boolean => {
    if (!currentUpgradeType) return false;
    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel];
    return gameDataStore.finance >= cost;
  };

  // 업그레이드 실행
  const executeUpgrade = () => {
    if (!currentUpgradeType || !canUpgrade() || !hasEnoughMoney()) return;

    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel];

    setIsUpgrading(true);

    setTimeout(() => {
      // 자본 차감
      gameDataStore.setFinance(gameDataStore.finance - cost);
      
      // 레벨 증가
      const newLevels = { ...upgradeLevels };
      newLevels[currentUpgradeType] = currentLevel + 1;
      
      // 효과 적용
      const upgradeInfo = UPGRADE_INFO[currentUpgradeType];
      if (upgradeInfo.productivityBonus) {
        const bonus = upgradeInfo.productivityBonus[currentLevel];
        gameDataStore.setProductivity(gameDataStore.productivity + bonus);
      }
      if (upgradeInfo.enterpriseValueBonus) {
        const bonus = upgradeInfo.enterpriseValueBonus[currentLevel];
        gameDataStore.setEnterpriseValue(gameDataStore.enterpriseValue + bonus);
      }

      setUpgradeLevels(newLevels);

      setTimeout(() => {
        setIsUpgrading(false);
        onClose();
      }, 1000);
    }, 500);
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
  const cost = upgradeInfo.costs[currentLevel];
  const canUpgradeThis = canUpgrade();
  const hasMoneyFor = hasEnoughMoney();

  let statusText = "";
  let statusColor = "";
  let buttonText = "레벨 " + (currentLevel + 1) + "로 업그레이드!";

  if (!canUpgradeThis) {
    if (currentUpgradeType === 'building') {
      const requiredValue = upgradeInfo.enterpriseValueRequirements![currentLevel];
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

  const currentIcon = currentLevel > 0 ? upgradeInfo.icons[currentLevel - 1] : upgradeInfo.icons[0];

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
            {/* 이미지 영역 */}
            <div className="w-full max-w-[300px] h-[200px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg mb-6 flex items-center justify-center border-2 border-gray-300">
              <div className="text-8xl animate-bounce-slow">
                {currentIcon}
              </div>
            </div>

            {/* 제목 */}
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
                비용: <span className="font-bold text-green-600">{cost.toLocaleString()}원</span>
              </p>
              
              {/* 추가 조건 표시 */}
              {currentUpgradeType === 'building' && upgradeInfo.enterpriseValueRequirements && (
                <p className="text-sm text-gray-500 mb-2">
                  필요 기업가치: <span className="font-bold">{upgradeInfo.enterpriseValueRequirements[currentLevel].toLocaleString()}</span>
                </p>
              )}

              {/* 보너스 효과 */}
              {upgradeInfo.productivityBonus && (
                <p className="text-sm text-blue-600">
                  생산성 +{upgradeInfo.productivityBonus[currentLevel]}
                </p>
              )}
              {upgradeInfo.enterpriseValueBonus && (
                <p className="text-sm text-purple-600">
                  기업가치 +{upgradeInfo.enterpriseValueBonus[currentLevel]}
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