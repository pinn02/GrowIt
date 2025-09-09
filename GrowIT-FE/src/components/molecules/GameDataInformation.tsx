import GameData from '../atoms/GameData'

const enterpriseValue = 1000;
const productivity = 500;
const finance = 100000;

function GameDataInformation() {
  return (
    <div className='flex items-center h-full'>
      <GameData dataName='기업가치' dataValue={ enterpriseValue } />
      <GameData dataName='생산성' dataValue={ productivity } />
      <GameData dataName='현재 자금' dataValue={ finance } />
    </div>
  )
}

export default GameDataInformation