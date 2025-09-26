import CloseButton from "../atoms/Button";
import UpgradeButton from "../atoms/Button";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useState } from "react";

import upgradedBus1 from "../../assets/upgrades/upgraded_bus1.png";
import upgradedBus2 from "../../assets/upgrades/upgraded_bus2.png";
import upgradedBus3 from "../../assets/upgrades/upgraded_bus3.png";
import upgradedBuilding1 from "../../assets/upgrades/upgraded_building1.png";
import upgradedBuilding2 from "../../assets/upgrades/upgraded_building2.png";
import upgradedBuilding3 from "../../assets/upgrades/upgraded_building3.png";
import storeBackgroundImage from "../../assets/background_images/store_page_background_image6.png";

type UpgradeType = 'commuteBus' | 'dormitory' | 'gym' | 'cafeteria' | 'hospital' | 'daycare' | 'bookCafe' | 'building';

interface BaseUpgradeInfo {
  name: string;
  icons: string[];
  maxLevel: number;
  costs: number[];
  description: string;
}

interface ProductivityUpgradeInfo extends BaseUpgradeInfo {
  productivityBonus: number[];
}

interface EnterpriseValueUpgradeInfo extends BaseUpgradeInfo {
  enterpriseValueBonus: number[];
}

interface BuildingUpgradeInfo extends BaseUpgradeInfo {
  enterpriseValueRequirements: number[];
  enterpriseValueBonus: number[];
}

type UpgradeInfo = ProductivityUpgradeInfo | EnterpriseValueUpgradeInfo | BuildingUpgradeInfo;

function hasProductivityBonus(info: UpgradeInfo): info is ProductivityUpgradeInfo {
  return 'productivityBonus' in info;
}

function hasEnterpriseValueBonus(info: UpgradeInfo): info is EnterpriseValueUpgradeInfo {
  return 'enterpriseValueBonus' in info;
}

function hasBuildingRequirements(info: UpgradeInfo): info is BuildingUpgradeInfo {
  return 'enterpriseValueRequirements' in info;
}

const UPGRADE_INFO: Record<UpgradeType, UpgradeInfo> = {
  commuteBus: {
    name: '통근버스',
    icons: [upgradedBus1, upgradedBus2, upgradedBus3],
    maxLevel: 3,
    costs: [100000, 200000, 300000],
    productivityBonus: [100, 200, 300],
    description: '직원들의 통근 편의성을 향상시킵니다'
  },
  dormitory: {
    name: '기숙사',
    icons: ['🏠', '🏘️', '🏢'],
    maxLevel: 3,
    costs: [100000, 200000, 300000],
    enterpriseValueBonus: [10, 20, 30],
    description: '직원들의 주거 환경을 개선합니다'
  },
  gym: {
    name: '사내 헬스장',
    icons: ['💪', '🏃', '🏋️'],
    maxLevel: 3,
    costs: [150000, 300000, 450000],
    productivityBonus: [150, 300, 450],
    description: '직원들의 건강과 업무 효율을 높입니다'
  },
  cafeteria: {
    name: '카페테리아',
    icons: ['🍽️', '🍜', '🍱'],
    maxLevel: 3,
    costs: [300000, 400000, 500000],
    enterpriseValueBonus: [30, 40, 50],
    description: '직원들의 식사 환경을 개선합니다'
  },
  hospital: {
    name: '병원',
    icons: ['🏥', '⛑️', '🚑'],
    maxLevel: 3,
    costs: [200000, 400000, 600000],
    productivityBonus: [200, 400, 600],
    description: '직원들의 의료 서비스를 제공합니다'
  },
  daycare: {
    name: '어린이집',
    icons: ['👶', '🧸', '🎠'],
    maxLevel: 3,
    costs: [400000, 800000, 1200000],
    enterpriseValueBonus: [40, 80, 120],
    description: '직원들의 육아 부담을 덜어줍니다'
  },
  bookCafe: {
    name: '북카페',
    icons: ['📚', '☕', '📖'],
    maxLevel: 3,
    costs: [120000, 250000, 400000],
    productivityBonus: [120, 250, 400],
    description: '직원들의 휴식과 자기계발을 돕습니다'
  },
  building: {
    name: '건물 업그레이드',
    icons: [upgradedBuilding1, upgradedBuilding2, upgradedBuilding3],
    maxLevel: 3,
    costs: [1000000, 3000000, 5000000],
    enterpriseValueRequirements: [500, 1500, 2500],
    enterpriseValueBonus: [100, 300, 500],
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

  const [, forceUpdate] = useState({});
  const [isUpgrading, setIsUpgrading] = useState(false);

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

  const triggerRerender = () => {
    forceUpdate({});
  };

  const getCurrentUpgrade = (): UpgradeType | null => {
    const minLevel = Math.min(...Object.values(upgradeLevels));

    for (const upgradeType of UPGRADE_ORDER) {
      if (upgradeLevels[upgradeType] === minLevel && upgradeLevels[upgradeType] < UPGRADE_INFO[upgradeType].maxLevel) {
        return upgradeType;
      }
    }

    return null;
  };

  const currentUpgradeType = getCurrentUpgrade();

  const canUpgrade = (): boolean => {
    if (!currentUpgradeType) return false;

    const currentLevel = upgradeLevels[currentUpgradeType];
    const upgradeInfo = UPGRADE_INFO[currentUpgradeType];

    if (currentLevel >= upgradeInfo.maxLevel) return false;

    if (currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo)) {
      const requiredValue = upgradeInfo.enterpriseValueRequirements[currentLevel];
      if (gameDataStore.enterpriseValue < requiredValue) return false;
    }

    return true;
  };

  const hasEnoughMoney = (): boolean => {
    if (!currentUpgradeType) return false;
    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel];
    return gameDataStore.finance >= cost;
  };

  const executeUpgrade = () => {
    if (!currentUpgradeType || !canUpgrade() || !hasEnoughMoney()) {
      return;
    }

    const currentLevel = upgradeLevels[currentUpgradeType];
    const cost = UPGRADE_INFO[currentUpgradeType].costs[currentLevel];

    setIsUpgrading(true);

    setTimeout(() => {
      gameDataStore.setFinance(gameDataStore.finance - cost);

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
          break;
      }

      const upgradeInfo = UPGRADE_INFO[currentUpgradeType];
      if (hasProductivityBonus(upgradeInfo)) {
        const bonus = upgradeInfo.productivityBonus[currentLevel];
        gameDataStore.setProductivity(gameDataStore.productivity + bonus);
      }
      if (hasEnterpriseValueBonus(upgradeInfo) || hasBuildingRequirements(upgradeInfo)) {
        const bonus = hasEnterpriseValueBonus(upgradeInfo)
          ? upgradeInfo.enterpriseValueBonus[currentLevel]
          : (upgradeInfo as BuildingUpgradeInfo).enterpriseValueBonus[currentLevel];
        gameDataStore.setEnterpriseValue(gameDataStore.enterpriseValue + bonus);
      }

      setTimeout(() => {
        setIsUpgrading(false);
        triggerRerender();
        
        // 자동 세이브는 MainPage에서 처리하므로 여기서는 제거
        console.log('업그레이드 완료 - 자동 세이브는 MainPage에서 처리됨');
      }, 200);
    }, 200);
  };

  if (!currentUpgradeType) {
    return (
      <div
        className="
          fixed
          top-16
          left-0
          right-0
          bottom-0
          flex
          justify-center
          items-center
          z-50
          animate-fadeIn
        "
        onClick={onClose}
      >
        <div
          className="
            relative
            transform
            transition-all
            duration-300
            scale-100
            pointer-events-auto
            flex
            flex-col
            justify-center
            items-center
            bg-white
            rounded-xl
            p-8
            shadow-2xl
            text-center
          "
          style={{
            width: '500px',
            height: '300px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-50">
            <CloseButton
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors flex items-center justify-center font-bold text-lg shadow-xl"
            >
              ×
            </CloseButton>
          </div>
          <div className="w-full flex flex-col items-center z-10 p-4">
            <h2 className="font-extrabold text-3xl text-center mb-4 text-black">🎉 축하합니다!</h2>
            <p className="text-lg text-center text-gray-600 font-semibold">
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
  let buttonText = `레벨 ${currentLevel + 1}로 업그레이드!`;

  if (!canUpgradeThis) {
    if (currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo)) {
      const requiredValue = upgradeInfo.enterpriseValueRequirements[currentLevel];
      const shortage = requiredValue - gameDataStore.enterpriseValue;
      statusText = `기업가치가 ${shortage.toLocaleString()} 부족합니다`;
      buttonText = "업그레이드 불가";
    }
  } else if (!hasMoneyFor) {
    const shortage = cost - gameDataStore.finance;
    statusText = `자본이 ${shortage.toLocaleString()}원 부족합니다`;
    buttonText = "자본 부족";
  }

  const currentIcon = upgradeInfo.icons[currentLevel];

  const isImageIcon = typeof currentIcon === 'string' && currentIcon.includes('.png');

  return (
    <>
      {isUpgrading && (
        <div className="fixed inset-0 flex justify-center items-center z-[100] pointer-events-none">
          <div className="upgrade-success-animation animate-popIn">
            <p className="text-black text-4xl md:text-5xl font-extrabold animate-typewriter animate-flash animate-zoomIn">
              업그레이드 성공! 🎉
            </p>
          </div>
        </div>
      )}

      <div
        className="
          fixed
          top-16
          left-0
          right-0
          bottom-0
          flex
          justify-center
          items-center
          z-50
          animate-fadeIn
        "
        onClick={onClose}
      >
        <div
          className="
            relative
            transform
            transition-all
            duration-300
            scale-100
            pointer-events-auto
            flex
            flex-col
            items-center
            justify-start
          "
          style={{
            backgroundImage: `url(${storeBackgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '600px',
            height: '800px',
            paddingTop: '120px',
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingBottom: '80px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-30 right-16 z-50">
            <CloseButton
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors flex items-center justify-center font-bold text-lg shadow-xl border-2 border-white"
            >
              ×
            </CloseButton>
          </div>
          <div className="w-full flex flex-col items-center z-10 pt-20 px-8 h-full">
            <div className="w-full h-full flex flex-col items-center justify-start">
              <div className="w-full max-w-[200px] h-[150px] flex items-center justify-center">
                {isImageIcon ? (
                  <img
                    src={currentIcon}
                    alt={upgradeInfo.name}
                    className="w-32 h-28 object-contain animate-bounce-slow"
                  />
                ) : (
                  <div className="flex justify-center items-center w-32 h-28 rounded-xl bg-white animate-bounce-slow">
                    <span className="text-6xl text-black">
                      {currentIcon}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="font-extrabold text-xl text-center mb-2 text-black">
                {upgradeInfo.name}
              </h2>
              <p className="text-sm text-black mb-3">
                현재 진행도: <span className="font-bold text-[#FF8C00]">{currentLevel} / {upgradeInfo.maxLevel}</span>
              </p>
            </div>

            <div className="w-full flex flex-col items-center mb-50">
              {canUpgradeThis && hasMoneyFor ? (
                <UpgradeButton
                  className="
                    w-2/3
                    bg-orange-400
                    hover:bg-orange-500
                    text-black
                    px-1
                    py-3
                    my-3
                    rounded-lg
                    transition-all
                    duration-200
                    font-bold
                    text-lg
                    shadow-md
                    hover:shadow-lg
                  "
                  onClick={executeUpgrade}
                >
                  {buttonText}
                </UpgradeButton>
              ) : (
                <button
                  className="
                    w-2/3
                    bg-gray-400
                    text-white
                    px-6
                    py-3
                    my-3
                    rounded-lg
                    font-bold
                    text-lg
                    cursor-not-allowed
                    opacity-60
                  "
                  disabled
                >
                  {buttonText}
                </button>
              )}
              <div className="text-center w-full">
                <p className="text-sm text-black mb-2">
                  자본: <span className="font-bold text-black">{cost.toLocaleString()}원</span>
                </p>

                {currentUpgradeType === 'building' && hasBuildingRequirements(upgradeInfo) && (
                  <p className="text-xs text-black mb-1">
                    필요 기업가치: <span className="font-bold text-black">{upgradeInfo.enterpriseValueRequirements[currentLevel].toLocaleString()}</span>
                  </p>
                )}

                {hasProductivityBonus(upgradeInfo) && (
                  <p className="text-xs text-black">
                    생산성 +{upgradeInfo.productivityBonus[currentLevel]}
                  </p>
                )}
                {(hasEnterpriseValueBonus(upgradeInfo) || hasBuildingRequirements(upgradeInfo)) && (
                  <p className="text-xs text-black">
                    기업가치 +{hasEnterpriseValueBonus(upgradeInfo)
                      ? upgradeInfo.enterpriseValueBonus[currentLevel]
                      : (upgradeInfo as BuildingUpgradeInfo).enterpriseValueBonus[currentLevel]}
                  </p>
                )}

                {statusText && (
                  <p className={`text-xs text-red-600 mt-1 font-semibold`}>
                    {statusText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreModal;