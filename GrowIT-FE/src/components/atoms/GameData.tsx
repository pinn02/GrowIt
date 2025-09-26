import AnimatedNumber from "../../hooks/AnimatedNumber";

type GameDataProps = {
  dataName: string;
  dataValue: number;
  dataMax: number;
  fillColor?: string;
	icon?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

// 게임에 사용하는 데이터 컴포넌트
function GameData({ dataName, dataValue, dataMax, fillColor = "bg-gray-700", icon, onMouseEnter, onMouseLeave }: GameDataProps) {
  const percentage = Math.min((dataValue / dataMax) * 100, 100);  // 게이지 표시용 퍼센테이지

  return (
    <div 
      className={`relative inline-flex items-center gap-2 px-4 rounded-full border-2 border-white overflow-hidden mx-2 shadow-md ${
        (onMouseEnter || onMouseLeave) ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 퍼센테이지만큼 색상이 차오르는 효과 */}
      <div
        className={`absolute left-0 top-0 h-full ${fillColor} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
      {/* 데이터 표시 */}
      <div className="relative z-10 flex items-center gap-2">
				{icon && <img src={icon} alt={dataName} className="w-10 h-10" />}
        <span className="font-pixel text-sm text-nowrap truncate">{dataName}</span>
        <span className="font-pixel text-lg">
          <AnimatedNumber value={dataValue ?? 0} />
        </span>
      </div>
    </div>
  );
}

export default GameData;
