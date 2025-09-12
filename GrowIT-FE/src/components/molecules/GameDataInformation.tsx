import GameData from '../atoms/GameData'
import { useGameDataStore } from '../../stores/gameDataStore'

function GameDataInformation() {
  const { enterpriseValue, productivity, finance, turn, currentProject } = useGameDataStore();
  
  return (
    <div className='w-full flex items-center'>
      <div className='flex items-center gap-6 mx-3'>
        <p className='text-xl font-bold mx-3 text-nowrap'>{turn} 턴</p>
        <div className='w-full'>
          <p className='text-nowrap'>진행 프로젝트: </p>
          <p className='text-nowrap'>{currentProject ? currentProject : "진행 중인 프로젝트 없음"}</p>
        </div>
      </div>     
      <div className='flex items-center h-full'>
        <GameData dataName='기업가치' dataValue={ enterpriseValue } />
        <GameData dataName='생산성' dataValue={ productivity } />
        <GameData dataName='현재 자금' dataValue={ finance } />
      </div>
    </div>
  )
}

export default GameDataInformation