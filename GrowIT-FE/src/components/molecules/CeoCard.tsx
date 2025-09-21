// CEO 정보 타입
type CeoInfo = {
  name: string;
  nickname: string;
  image: string;
  description: string[];
  effects: {
    positive: string[];
    negative: string[];
  };
}

type CeoCardProps = {
  ceo: CeoInfo;
  isSelected: boolean;
  onClick: () => void;
}

function CeoCard({ ceo, isSelected, onClick }: CeoCardProps) {
  return (
    <div
      className={`
        bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-300 border-4 flex flex-col
        ${isSelected 
          ? 'border-orange-500' 
          : 'border-gray-600 hover:border-gray-400 hover:bg-gray-700'
        }
      `}
      style={{ height: '450px' }}
      onClick={onClick}
    >
      {/* CEO 이미지 */}
      <div className="text-center mb-4 flex-shrink-0">
        <div className="w-32 h-36 mx-auto mb-3 bg-slate-200 rounded-lg flex items-center justify-center overflow-hidden border-2 border-slate-300">
          <img 
            src={ceo.image} 
            alt={ceo.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-white">{ceo.name}</h3>
      </div>

      {/* CEO 설명 */}
      <div className="mb-4 flex-shrink-0">
        {ceo.description.map((desc, descIdx) => (
          <p key={descIdx} className="text-sm text-gray-300 text-center leading-relaxed">{desc}</p>
        ))}
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        {/* 긍정적 효과 */}
        {ceo.effects.positive.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-green-400 mb-2">💰 보너스:</p>
            <ul className="text-sm text-green-300 space-y-1">
              {ceo.effects.positive.map((effect, effectIdx) => (
                <li key={effectIdx} className="leading-relaxed">• {effect}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 부정적 효과 */}
        {ceo.effects.negative.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-red-400 mb-2">⚠️ 리스크:</p>
            <ul className="text-sm text-red-300 space-y-1">
              {ceo.effects.negative.map((effect, effectIdx) => (
                <li key={effectIdx} className="leading-relaxed">• {effect}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default CeoCard
