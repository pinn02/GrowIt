import GameData from '../atoms/GameData'
import { useGameDataStore } from '../../stores/gameDataStore'
import coinIcon  from '../../assets/icons/coin.png'
import productivityIcon  from '../../assets/icons/productivity.png'
import enterpriseIcon  from '../../assets/icons/enterprise.png'

const MAX_TURN = 3

function GameDataInformation() {
  const { enterpriseValue, productivity, finance, turn, currentProject } = useGameDataStore();
  
  return (
    <div className='w-full flex items-center'>
      <div className='flex items-center gap-6 mx-3'>
        <p className='text-2xl font-bold text-nowrap'>{turn} / {MAX_TURN} 턴</p>
        <div className='w-full flex flex-col'>
          <p className='text-nowrap'>진행 프로젝트: {currentProject.turn > 0 ? currentProject.name : "없음"}</p>
          <p className='text-nowrap'>{currentProject.turn > 0 ? `보수: ${currentProject.reward} | ${currentProject.turn} 턴 남음` : ""}</p>
        </div>
      </div>     
      <div className='flex items-center h-full'>
        <GameData dataName='기업가치' icon={enterpriseIcon} dataValue={enterpriseValue} dataMax={2000} fillColor="bg-[#45A14B]" />
        <GameData dataName='생산성' icon={productivityIcon} dataValue={productivity} dataMax={1000} fillColor="bg-[#B374F3]" />
        <GameData dataName='자본' icon={coinIcon} dataValue={finance} dataMax={5000000} fillColor="bg-[#F8C545]" />
      </div>
    </div>
  )
}

export default GameDataInformation