import { useGameDataStore } from "../stores/gameDataStore"
import MainPageButton from "../components/atoms/Button"
import endingPageBackgroundImage from "../assets/background_images/ending.png"
import startUpEnding from "../assets/images/startup.png"
import unicornEnding from "../assets/images/unicorn.png"
import middleEnding from "../assets/images/middle.png"
import bigEnding from "../assets/images/big.png"
import { useEffect, useState } from "react"

const mainPageButtonSize = 400  // 메인 화면으로 돌아가는 버튼 사이즈

const enterpriseImage = [
  startUpEnding,
  unicornEnding,
  middleEnding,
  bigEnding
]

const enterpriseBackgroundColor = [
  "text-white",
  "text-amber-200",
  "text-emerald-400",
  "text-purple-400"
]

const enterpriseTitle = [
  "스타트업",
  "유니콘기업",
  "중견기업",
  "대기업"
]

// 엔딩 페이지
function EndingPage() {
  const gameDataStore = useGameDataStore()
  const enterpriseValue = useGameDataStore(state => state.enterpriseValue)
  const [enterpriseIdx, setEnterpriseIdx] = useState(0)

  useEffect(() => {
    if (enterpriseValue > 4000) {
      setEnterpriseIdx(3)
    } else if (enterpriseValue > 2500) {
      setEnterpriseIdx(2)
    } else if (enterpriseValue > 1000) {
      setEnterpriseIdx(1)
    }
  }, [enterpriseValue, enterpriseIdx])

  return (
    <div className="relative w-screen h-screen">
      {/* 엔딩 배경 */}
      <img src={endingPageBackgroundImage} alt="엔딩 페이지" className="absolute z-0 w-screen object-cover overflow-hidden h-[100%]" />
      <div className="flex items-center justify-center relative h-full z-10">
        <div className="w-[50%] h-[60%] bg- rounded-3xl text-center p-5 bg-white">
          <p className="text-3xl font-bold mb-3">Ending</p>
          <div className="w-full h-[90%] flex items-center justify-between px-20 mb-3">
            {/* 기업 데이터 */}
            <img
              src={enterpriseImage[enterpriseIdx]}
              alt="엔딩"
              className="h-[90%] aspect-[1/1] rounded-3xl"
            />
            <div className="gap-3 mb-3 rounded-3xl mx-3 h-[85%] p-5">
              <p className={`font-bold text-4xl mb-8 ${enterpriseBackgroundColor[enterpriseIdx]}`}>
                {enterpriseTitle[enterpriseIdx]}
              </p>
              <p className="text-xl font-bold mb-5">최종 점수</p>
              <p>기업 가치: <span className="font-bold">{gameDataStore.enterpriseValue.toLocaleString()}</span></p>
              <p>생산성: <span className="font-bold">{gameDataStore.productivity.toLocaleString()}</span></p>
              <p>자금: <span className="font-bold">{gameDataStore.finance.toLocaleString()}G</span></p>
              <MainPageButton
                maxSize={mainPageButtonSize}
                className="border-2 mt-10 border-white text-white bg-green-600 px-4 py-2 my-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                to="/"
              >
                메인 페이지로 이동
              </MainPageButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndingPage