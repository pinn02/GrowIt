import CloseButton from "../atoms/Button";
import UpgradeButton from "../atoms/Button";
import officeUpgradeImage from "../../assets/images/office_upgrade.png";
import { useGameDataStore } from "../../stores/gameDataStore";
import { useState } from "react";

const UPGRADE_CONDITIONS = [
  { enterpriseValue: 100, cost: 100000 },
  { enterpriseValue: 200, cost: 200000 },
  { enterpriseValue: 300, cost: 300000 },
];

const MAX_OFFICE_LEVEL = 3;

type StoreModalProps = {
  onClose: () => void;
};

function StoreModal({ onClose }: StoreModalProps) {
  const gameDataStore = useGameDataStore();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const currentUpgradeCondition = UPGRADE_CONDITIONS[gameDataStore.officeLevel];

  const upgradeOffice = () => {
    if (currentUpgradeCondition && gameDataStore.finance >= currentUpgradeCondition.cost) {
      setIsUpgrading(true);

      setTimeout(() => {
        gameDataStore.setFinance(gameDataStore.finance - currentUpgradeCondition.cost);
        gameDataStore.setOfficeLevel(gameDataStore.officeLevel + 1);

        setTimeout(() => {
          setIsUpgrading(false);
          onClose();
        }, 500); 
      }, 500);
    }
  };

  const canUpgrade = () => {
    if (gameDataStore.officeLevel >= MAX_OFFICE_LEVEL) return false;
    if (!currentUpgradeCondition) return false;
    return gameDataStore.enterpriseValue >= currentUpgradeCondition.enterpriseValue;
  };

  const hasEnoughMoney = () => {
    if (!currentUpgradeCondition) return false;
    return gameDataStore.finance >= currentUpgradeCondition.cost;
  };

  const getEnterpriseValueShortage = () => {
    if (!currentUpgradeCondition) return 0;
    return currentUpgradeCondition.enterpriseValue - gameDataStore.enterpriseValue;
  };

  const getMoneyShortage = () => {
    if (!currentUpgradeCondition) return 0;
    return currentUpgradeCondition.cost - gameDataStore.finance;
  };

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
            hover:scale-105
            pointer-events-auto
            border-4 border-blue-400
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10">
            <CloseButton
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center font-bold shadow-lg transform hover:rotate-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CloseButton>
          </div>

          <div className="w-full flex flex-col items-center">
            <img
              src={officeUpgradeImage}
              alt="사무실 업그레이드"
              className="w-full max-h-[200px] object-contain mb-6 animate-bounce-slow"
            />
            <h2 className="font-extrabold text-3xl text-center mb-2 text-gray-900">사무실 업그레이드</h2>
            <p className="text-base text-gray-600 mb-6">
              현재 레벨: <span className="font-bold text-blue-600">{gameDataStore.officeLevel}</span> / {MAX_OFFICE_LEVEL}
            </p>

            {gameDataStore.officeLevel >= MAX_OFFICE_LEVEL ? (
              <p className="text-center font-bold text-green-600 text-xl py-4 animate-pulse-slow">
                최대 레벨입니다! 🎉
              </p>
            ) : !canUpgrade() ? (
              <div className="text-center mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300 animate-shake">
                <p className="font-semibold text-lg text-red-500">기업 가치가 <span className="font-extrabold text-red-700">{getEnterpriseValueShortage().toLocaleString()}</span> 모자랍니다.</p>
                <p className="text-sm text-gray-600 mt-2">
                  필요 기업가치: <span className="font-bold">{currentUpgradeCondition.enterpriseValue.toLocaleString()}</span>
                </p>
              </div>
            ) : !hasEnoughMoney() ? (
              <div className="text-center mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300 animate-shake">
                <p className="font-semibold text-lg text-red-500">자금이 <span className="font-extrabold text-red-700">{getMoneyShortage().toLocaleString()}</span> 모자랍니다.</p>
                <p className="text-sm text-gray-600 mt-2">
                  업그레이드 비용: <span className="font-bold">{currentUpgradeCondition.cost.toLocaleString()}</span>
                </p>
              </div>
            ) : (
              <div className="text-center mt-4 w-full px-4">
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
                    uppercase
                    animate-pulse animate-flicker
                  "
                  onClick={upgradeOffice}
                >
                  🎉 레벨 {gameDataStore.officeLevel + 1}로 업그레이드!
                </UpgradeButton>
                <p className="text-base text-gray-600 mt-2">
                  비용: <span className="font-bold text-green-600">{currentUpgradeCondition.cost.toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  필요 기업가치: <span className="font-bold">{currentUpgradeCondition.enterpriseValue.toLocaleString()}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreModal;