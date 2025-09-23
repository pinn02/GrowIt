import DecisionButtonClicked from "../../assets/buttons/button.png"
import DecisionButtonNotClicked from "../../assets/buttons/button_disabled.png"

type DecisionButtonProps = {
  cardType: string;
  selected: boolean;
  onSelect: () => void;
}

const DecisionButton = ({ cardType, selected, onSelect }: DecisionButtonProps) => {
  // 버튼 활성화 상태 확인
  const handleClick = () => {
    if (!selected) {
      onSelect()
    } else {
      console.log(`${cardType} 이미 선택됨`)
    }
  }

  return (
    <div 
      onClick={handleClick} 
      className={`relative inline-block ${!selected ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <img
        src={selected ? DecisionButtonNotClicked : DecisionButtonClicked}
        alt="결정 버튼"
        className="w-40 h-14"
      />
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {selected ? "선택완료" : "선택"}
      </span>
    </div>
  )
}

export default DecisionButton
