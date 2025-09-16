import endingPageBackgroundImage from "../assets/background_images/ending.png"
import { useGameDataStore } from "../stores/gameDataStore"
import MainPageButton from "../components/atoms/Button"

const nextButtonSize = 400

function EndingPage() {
  const gameDataStore = useGameDataStore()

  return (
    <div className="relative w-screen h-screen">
      <img
        src={endingPageBackgroundImage}
        alt="엔딩 페이지"
        className="absolute z-0 w-screen object-cover overflow-hidden h-[100%]"
      />
      <div className="flex items-center justify-center relative h-full z-10">
        <div className="w-[50%] h-[50%] bg-white rounded-3xl text-center p-5">
          <p className="text-3xl font-bold">Ending</p>
          <div className="w-full h-[90%] flex items-center justify-center">
            <div className="gap-3 mb-3">
              <p className="text-xl font-bold mb-5">최종 점수</p>
              <p>기업 가치: {gameDataStore.enterpriseValue.toLocaleString()}</p>
              <p>생산성: {gameDataStore.productivity.toLocaleString()}</p>
              <p>자금: {gameDataStore.finance.toLocaleString()}G</p>
              <MainPageButton
                maxSize={nextButtonSize}
                className="border-2 border-white text-white bg-green-600 px-4 py-2 my-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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