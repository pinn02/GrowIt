type GameDataProps = {
  dataName: string;
  dataValue: number;
  dataMax: number;
  fillColor?: string; // 게이지 색상
	icon?: React.ReactNode; // 아이콘 
};

function GameData({ dataName, dataValue, dataMax, fillColor = "bg-gray-700", icon }: GameDataProps) {
  const percentage = Math.min((dataValue / dataMax) * 100, 100);

  return (
    <div className="relative inline-flex items-center gap-2 px-4 rounded-full border-2 border-white overflow-hidden mx-2 shadow-md">
      {/* 게이지 */}
      <div
        className={`absolute left-0 top-0 h-full ${fillColor} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
      {/* 내용 */}
      <div className="relative z-10 flex items-center gap-2">
				{icon && <img src={icon} alt={dataName} className="w-10 h-10" />}
        <span className="font-pixel text-white text-sm">{dataName}</span>
        <span className="font-pixel text-white text-lg">
          {(dataValue ?? 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default GameData;
