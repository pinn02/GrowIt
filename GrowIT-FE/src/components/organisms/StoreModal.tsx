import CloseButton from "../atoms/Button"
import UpgradeButton from "../atoms/Button"
import officeUpgradeImage from "../../assets/images/office_upgrade.png"
import { useGameDataStore } from "../../stores/gameDataStore"


const ENTERPRISE_VALUE_FOR_UPGRADE = 1000
const upgradePrise = 100000

type StoreModalProps = {
  onClose: () => void
}

function StoreModal({ onClose }: StoreModalProps) {
  const gameDataStore = useGameDataStore()

  const upgradeOffice = () => {
    if (gameDataStore.finance >= upgradePrise) {
      gameDataStore.setFinance(gameDataStore.finance - upgradePrise)
      gameDataStore.setOfficeLevel(gameDataStore.officeLevel + 1)
      onClose()
    }
  }

  return (
    <>
      <div
        className="
          fixed
          inset-0
          w-full
          flex
          justify-center
          items-center
          z-50
          pointer-events-none
          overflow-hidden
          bg-black/50
        "
      >
        <div
          className="w-[30%] h-auto bg-yellow-100 rounded-2xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-end">
            <CloseButton
              onClick={onClose}
              className="bg-red-300 text-black px-2 py-2 my-3 rounded hover:bg-red-400 transition-colors m-3"
            >
              X
            </CloseButton>
          </div>
          <div className="w-full h-[60%] flex flex-col justify-center items-center pb-8">
            <img
              src={officeUpgradeImage}
              alt="사무실 업그레이드"
              className="w-[80%] h-auto "
            />
            <p className="font-bold text-xl">사무실 업그레이드</p>
            {
              gameDataStore.officeLevel < 1
              ? (gameDataStore.enterpriseValue >= ENTERPRISE_VALUE_FOR_UPGRADE
                ? <div className="text-center">
                    <UpgradeButton
                    className="bg-red-300 text-black px-2 py-2 my-3 rounded hover:bg-red-400 transition-colors m-3"
                    onClick={upgradeOffice}
                    >
                      Upgrade
                    </UpgradeButton>
                    <p>비용 {upgradePrise.toLocaleString()}이 소모됩니다.</p>
                </div>
                : `기업 가치가 ${(ENTERPRISE_VALUE_FOR_UPGRADE - gameDataStore.enterpriseValue).toLocaleString()} 모자랍니다.`)
              : <p>최대 레벨입니다.</p>
              }
          </div>
        </div>
      </div>
    </>
  )
}

export default StoreModal