import GameData from '../atoms/GameData'
import { useGameDataStore } from '../../stores/gameDataStore'
import coinIcon  from '../../assets/icons/coin.png'
import productivityIcon  from '../../assets/icons/productivity.png'
import enterpriseIcon  from '../../assets/icons/enterprise.png'

function GameDataInformation() {
  const { enterpriseValue, productivity, finance, turn, currentProject } = useGameDataStore();
  
  return (
    <div className='w-full flex items-center'>
      <div className='flex items-center gap-6 mx-3'>
        <p className='text-sm font-bold text-nowrap'>{turn} 턴</p>
        <div className='w-full flex'>
          <p className='text-nowrap text-sm'>진행 프로젝트: </p>
          <p className='text-nowrap text-sm'>{currentProject ? currentProject : "없음"}</p>
        </div>
      </div>     
      <div className='flex items-center h-full'>
        <GameData dataName='기업가치' icon={enterpriseIcon} dataValue={enterpriseValue} dataMax={1000000} fillColor="bg-[#2D2F33]" />
        <GameData dataName='생산성' icon={productivityIcon} dataValue={productivity} dataMax={100} fillColor="bg-[#B374F3]" />
        <GameData dataName='자본' icon={coinIcon} dataValue={finance} dataMax={5000000} fillColor="bg-[#F8C545]" />
      </div>
    </div>
  )
}

export default GameDataInformation