import applicantCardImage from "../../assets/cards/paper_card.png"
import FiringButton from "../atoms/FiringButton"

function FiringCard() {
  return (
    <>
      <img
        src={applicantCardImage}
        alt="해고자"
        className="w-[30%] h-auto object-contain mx-3"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <FiringButton />
      </div>
    </>
  )
}

export default FiringCard