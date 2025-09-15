import DifficultyButton from "../atoms/Button"

function DifficultyTemplate() {
  const difficultyList = [
    { name: "Easy" },
    { name: "Normal" },
    { name: "Hard" }
  ]
  
  const difficultyButtonSize = 800

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-6">
      <div className="flex flex-col items-center w-full">
        {difficultyList.map((difficulty, idx) => (
          <DifficultyButton
            key={idx}
            maxSize={difficultyButtonSize}
            className="w-1/2 block bg-orange-300 font-extrabold text-black px-6 py-6 rounded hover:bg-orange-400 transition-colors my-3"
            to="/main"
          >
            {difficulty.name}
          </DifficultyButton>
        ))}
      </div>
    </div>
  )
}

export default DifficultyTemplate