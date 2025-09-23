// ceo 페이지 버튼
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

type SliderButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

function SliderButton({ direction, onClick, disabled = false }: SliderButtonProps) {
  const icon = direction === 'left' ? faChevronLeft : faChevronRight
  const position = direction === 'left' ? 'left-0' : 'right-0'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute ${position} top-1/2 transform -translate-y-1/2 z-10 
        bg-gray-800 hover:bg-gray-700 rounded-full p-3 border-2 border-gray-600 
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <FontAwesomeIcon icon={icon} className="w-6 h-6 text-white" />
    </button>
  )
}

export default SliderButton
