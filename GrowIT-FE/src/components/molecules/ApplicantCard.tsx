import applicantCardImage from "../../assets/cards/applicant_card.png"

function ApplicantCard() {
  return (
    <>
      <img
        src={applicantCardImage}
        alt="지원자"
        className="w-[30%] h-auto object-contain mx-3"
      />
    </>
  )
}

export default ApplicantCard