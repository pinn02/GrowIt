import { useState } from "react"
import applicantCardImage from "../../assets/cards/applicant_card.png"
import SelectButton from "../atoms/Button"

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

function ApplicantCard({ applicant }: ApplicantCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const selectButtonSize = 100

  const hiringButton1 = useButtonStore((state) => state.hiringButton1)
  const setHiringButton1 = useButtonStore((state) => state.setHiringButton1)
  const gameDataStore = useGameDataStore()

  const hiringSelected = () => {
    gameDataStore.setFinance(gameDataStore.finance - applicant.salary)
    gameDataStore.setProductivity(gameDataStore.productivity + Math.round(applicant.productivity * (Math.random() * (1.25 - 0.75) + 0.75)))
    
    setHiringButton1(false)
  }

  return (
    <>
      <div className="relative w-[30%] h-auto object-contain mx-3 mt-3">
        <img
          src={applicantCardImage}
          alt="지원자 카드"
          className="w-full h-auto"
        />
        <img
          src={applicantImages[applicant.imageIndex]}
          alt="지원자"
          className="h-auto absolute left-[10%] top-[7%] w-[80%]"
        />
        <div className="absolute left-[10%] top-[58%] w-[80%]">
          <p className="font-bold text-clamp-title text-center">{applicant.name}</p>
          <p className="text-clamp-base">{applicant.position}</p>
          <p className="text-clamp-base">생산성: {applicant.productivity}</p>
          <p className="text-clamp-base">급여: {applicant.salary.toLocaleString()}G</p>
          <div className="flex justify-center">
            <SelectButton
              maxSize={selectButtonSize}
              disabled={!hiringButton1 || gameDataStore.finance < applicant.salary}
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
              {hiringButton1 ? (gameDataStore.finance >= applicant.salary ? "선택" : "자금 부족") : "선택 완료"}
            </SelectButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicantCard