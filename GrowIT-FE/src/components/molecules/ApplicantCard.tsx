import SelectButton from "../atoms/Button"
import applicantCardImage from "../../assets/cards/applicant_card.png"
import myImage from "../../assets/applicants/a_my.png"
import mmImage from "../../assets/applicants/a_mm.png"
import moImage from "../../assets/applicants/a_mo.png"
import wyImage from "../../assets/applicants/a_wy.png"
import wmImage from "../../assets/applicants/a_wm.png"
import woImage from "../../assets/applicants/a_wo.png"
import { useButtonStore } from "../../stores/buttonStore"
import { useGameDataStore } from "../../stores/gameDataStore"

const applicantImages = [
  myImage,
  mmImage,
  moImage,
  wyImage,
  wmImage,
  woImage,
]

type Applicant = {
  id: number,
  name: string
  position: string
  salary: number
  productivity: number
  imageIndex: number
}

type ApplicantCardProps = {
  applicant: Applicant
}

// 직원 정보 표시하는 카드
function ApplicantCard({ applicant }: ApplicantCardProps) {
  const selectButtonSize = 100  // 선택 버튼 최대 사이즈
  const gameDataStore = useGameDataStore()
  // 고용 상태를 실시간으로 반응하도록 ButtonStore 활용
  const hiringButton = useButtonStore((state) => state.hiringButton)
  const setHiringButton = useButtonStore((state) => state.setHiringButton)

  const currentCost = applicant.salary * gameDataStore.hiringInput
  const currentReward = Math.round(applicant.productivity * gameDataStore.hiringOutput)

  // 버튼 클릭 시 고용 관련 동작
  const hiringSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - currentCost)
    gameDataStore.setProductivity(gameDataStore.productivity + currentReward)
    gameDataStore.setHiredPerson([...gameDataStore.hiredPerson, applicant.id])
    setHiringButton(false)
  }

  return (
    <div className="relative w-[30%] h-auto object-contain mx-3 mt-3">
      {/* 카드 배경 이미지 */}
      <img src={applicantCardImage} alt="지원자 카드" className="w-full h-auto" />

      {/* 직원 이미지 */}
      <img
        src={applicantImages[applicant.imageIndex]}
        alt={applicant.name}
        className="h-auto absolute left-[10%] top-[7%] w-[80%]"
      />
      
      <div className="absolute left-[10%] top-[58%] w-[80%]">
        <p className="font-bold text-clamp-title text-center">{applicant.name}</p>
        <p className="text-clamp-base truncate">{applicant.position}</p>
        <p className="text-clamp-base">생산성: {currentReward}</p>
        <p className="text-clamp-base">급여: {currentCost.toLocaleString()}G</p>
        <div className="flex justify-center">
          <SelectButton
            maxSize={selectButtonSize}
            disabled={!hiringButton || gameDataStore.finance < currentCost}
            className="
              bg-orange-400
              text-black
              mt-0
              px-auto
              py-auto
              rounded
              hover:bg-orange-500
              transition-colors
              mx-2
              text-clamp-base
              w-full
            "
            onClick={() => {
              hiringSelected()
            }}
          >
            {hiringButton ? (gameDataStore.finance >= currentCost ? "선택" : "자금 부족") : "선택 완료"}
          </SelectButton>
        </div>
      </div>
    </div>
  )
}

export default ApplicantCard