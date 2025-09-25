import { useState } from "react"

type TooltipButtonProps = {
  label?: string
  tooltipText: string
}

function TooltipButton({ label = "?", tooltipText }: TooltipButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
      </button>

      {
        isHovered &&
        <div className="
          absolute
          bottom-full
          mb-2
          left-1/2
          transform
          -translate-x-1/2
          px-3
          py-2
          bg-black
          text-white
          text-sm
          rounded
          shadow-lg
          whitespace-nowrap
          z-50
        ">
          {tooltipText}
        </div>
      }
    </div>
  )
}

export default TooltipButton