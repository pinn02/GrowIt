import { useState } from 'react'
import { useGameDataStore } from '../../stores/gameDataStore'
import GameData from '../atoms/GameData'
import EnterpriseValueModal from './EnterpriseValueModal'
import ProductivityModal from './ProductivityModal'
import FinanceModal from './FinanceModal'
import financeIcon  from '../../assets/icons/coin.png'
import productivityIcon  from '../../assets/icons/productivity.png'
import enterpriseIcon  from '../../assets/icons/enterprise.png'
import AnimatedNumber from '../../hooks/AnimatedNumber'

const gameDataList = [
  { name: "기업가치", iconImage: enterpriseIcon, maxData: 3000, fillColor: "bg-[#45A14B]" },
  { name: "생산성", iconImage: productivityIcon, maxData: 30000, fillColor: "bg-[#B374F3]" },
  { name: "자본", iconImage: financeIcon, maxData: 30000000, fillColor: "bg-[#F8C545]" },
]

type GameDataInformationProps = {
  MAX_TURN: number
}

// 게임 정보를 표시해주는 번들
function GameDataInformation({ MAX_TURN }: GameDataInformationProps) {
  const { enterpriseValue, productivity, finance, turn, currentProject } = useGameDataStore();
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false)
  const [isProductivityModalOpen, setIsProductivityModalOpen] = useState(false)
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false)
  
  const productivityBonus = Math.floor(useGameDataStore(state => state.productivity) / 500) / 10 + 1
  
  return (
    <>
    <div className='w-full flex items-center'>
      <div className='flex items-center gap-6 mx-3'>
        {/* 턴 표시 */}
        <p className='text-2xl font-bold text-nowrap'>
          <AnimatedNumber value={turn} /> / {MAX_TURN} 턴
        </p>
        
        <div className="relative w-full flex flex-col rounded-xl p-[2px] overflow-hidden">
          {/* 회전하는 그라데이션 테두리 */}
          {currentProject.turn > 0 && (
            <div className="absolute inset-0 rounded-xl p-[15px] animate-spin-slow bg-[conic-gradient(from_0deg,theme(colors.green.400),theme(colors.green.500),theme(colors.green.600),theme(colors.green.400))]"></div>
          )}
          <div className="relative flex flex-col w-full h-full rounded-lg bg-zinc-300 px-3 py-1">
            <p className="text-nowrap">
              진행 프로젝트: {currentProject.turn > 0 ? currentProject.name : "없음"}
            </p>
            <p className="text-nowrap">
              {currentProject.turn > 0 ? (
                <>
                  보수: {currentProject.reward.toLocaleString()} x <span className='font-bold text-blue-700'>{productivityBonus}</span>
                  <span> |{" "}</span>
                  <AnimatedNumber value={currentProject.turn} /> 턴 남음
                </>
              ) : null}
            </p>
          </div>
        </div>


      </div>

      {/* 게임 데이터 표시 */}
      <div className='flex items-center h-full'>
        {gameDataList.map((data, idx) => {
          const isEnterpriseValue = data.name === "기업가치"
          const isProductivity = data.name === "생산성"
          const isFinance = data.name === "자본"
          const needsModal = isEnterpriseValue || isProductivity || isFinance
          
          return (
            <div key={idx} className={needsModal ? 'relative' : ''}>
              <GameData
                dataName={data.name}
                icon={data.iconImage}
                dataValue={data.name === "기업가치" ? enterpriseValue : (data.name === "생산성" ? productivity : finance)}
                dataMax={data.maxData}
                fillColor={data.fillColor}
                onMouseEnter={
                  isEnterpriseValue ? () => {
                    setIsEnterpriseModalOpen(true)
                    setIsProductivityModalOpen(false)
                    setIsFinanceModalOpen(false)
                  } :
                  isProductivity ? () => {
                    setIsProductivityModalOpen(true)
                    setIsEnterpriseModalOpen(false)
                    setIsFinanceModalOpen(false)
                  } :
                  isFinance ? () => {
                    setIsFinanceModalOpen(true)
                    setIsEnterpriseModalOpen(false)
                    setIsProductivityModalOpen(false)
                  } :
                  undefined
                }
                onMouseLeave={
                  needsModal ? () => {
                    setIsEnterpriseModalOpen(false)
                    setIsProductivityModalOpen(false)
                    setIsFinanceModalOpen(false)
                  } : undefined
                }
              />
              
              {/* 기업 가치 모달 */}
              {isEnterpriseValue && (
                <EnterpriseValueModal
                  isOpen={isEnterpriseModalOpen}
                  onClose={() => {
                    setIsEnterpriseModalOpen(false)
                    setIsProductivityModalOpen(false)
                    setIsFinanceModalOpen(false)
                  }}
                />
              )}
              
              {/* 생산성 모달 */}
              {isProductivity && (
                <ProductivityModal
                  isOpen={isProductivityModalOpen}
                  onClose={() => {
                    setIsProductivityModalOpen(false)
                    setIsEnterpriseModalOpen(false)
                    setIsFinanceModalOpen(false)
                  }}
                />
              )}
              
              {/* 자본 모달 */}
              {isFinance && (
                <FinanceModal
                  isOpen={isFinanceModalOpen}
                  onClose={() => {
                    setIsFinanceModalOpen(false)
                    setIsEnterpriseModalOpen(false)
                    setIsProductivityModalOpen(false)
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default GameDataInformation