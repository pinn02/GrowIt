import { useGameDataStore } from '../../stores/gameDataStore'
import GameData from '../atoms/GameData'
import financeIcon  from '../../assets/icons/coin.png'
import productivityIcon  from '../../assets/icons/productivity.png'
import enterpriseIcon  from '../../assets/icons/enterprise.png'

const gameDataList = [
  { name: "기업가치", iconImage: enterpriseIcon, maxData: 1000, fillColor: "bg-[#45A14B]" },
  { name: "생산성", iconImage: productivityIcon, maxData: 10000, fillColor: "bg-[#B374F3]" },
  { name: "자본", iconImage: financeIcon, maxData: 10000000, fillColor: "bg-[#F8C545]" },
]

type GameDataInformationProps = {
  MAX_TURN: number
}

// 게임 정보를 표시해주는 번들
function GameDataInformation({ MAX_TURN }: GameDataInformationProps) {
  const { enterpriseValue, productivity, finance, turn, currentProject } = useGameDataStore();
  
  return (
    <div className='w-full flex items-center'>
      <div className='flex items-center gap-6 mx-3'>
        {/* 턴 표시 */}
        <p className='text-2xl font-bold text-nowrap'>{turn} / {MAX_TURN} 턴</p>

        {/* 진행 프로젝트 표시 */}
        <div className='w-full flex flex-col'>
          <p className='text-nowrap'>진행 프로젝트: {currentProject.turn > 0 ? currentProject.name : "없음"}</p>
          <p className='text-nowrap'>{currentProject.turn > 0 ? `보수: ${currentProject.reward} | ${currentProject.turn} 턴 남음` : ""}</p>
        </div>
      </div>

      {/* 게임 데이터 표시 */}
      <div className='flex items-center h-full'>
        {gameDataList.map((data, idx) => (
          <GameData
            key={idx}
            dataName={data.name}
            icon={data.iconImage}
            dataValue={data.name === "기업가치" ? enterpriseValue : (data.name === "생산성" ? productivity : finance)}
            dataMax={data.maxData}
            fillColor={data.fillColor}
          />
        ))}
      </div>
    </div>
  )
}

export default GameDataInformation