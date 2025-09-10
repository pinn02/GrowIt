import { useState } from "react"
import InvestmentButtonClicked from "../../assets/buttons/button.png"
import InvestmentButtonNotClicked from "../../assets/buttons/button_disabled.png"

const InvestmentButton = () => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked((prev) => !prev)
  }

  return (
    <div onClick={handleClick} className="relative cursor-pointer inline-block">
      <img
        src={isClicked ? InvestmentButtonClicked : InvestmentButtonNotClicked}
        alt="Marketing Button"
        className="w-40 h-14"
      />

      <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {isClicked ? "선택완료" : "선택"}
      </span>
    </div>
  )
}

export default InvestmentButton
