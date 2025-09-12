import { useState } from "react"
import applicantCardImage from "../../assets/cards/applicant_card.png"
import SelectButton from "../atoms/Button"

type Applicant = {
  applicantName: string
  position: string
  salary: number
  productivity: number
  applicantImage: string
}

type ApplicantCardProps = {
  applicant: Applicant
}

function ApplicantCard({ applicant }: ApplicantCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const selectButtonSize = 48

  return (
    <>
      <div className="relative w-[30%] h-auto object-contain mx-3 mt-3">
        <img
          src={applicantCardImage}
          alt="지원자 카드"
          className="w-full h-auto"
        />
        <img
          src={applicant.applicantImage}
          alt="지원자"
          className="h-auto absolute left-[10%] top-[7%] w-[80%]"
        />
        <div className="absolute left-[10%] top-[58%] w-[80%]">
          <p className="font-bold text-clamp-title text-center">{applicant.applicantName}</p>
          <p className="text-clamp-base">{applicant.position}</p>
          <p className="text-clamp-base">생산성: {applicant.productivity}</p>
          <p className="text-clamp-base">급여: {applicant.salary.toLocaleString()}G</p>
          <div className="flex justify-center">
            <SelectButton
              maxSize={selectButtonSize}
              disabled={isDisabled}
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
                setIsDisabled(true);
              }}
            >
              선택
            </SelectButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicantCard