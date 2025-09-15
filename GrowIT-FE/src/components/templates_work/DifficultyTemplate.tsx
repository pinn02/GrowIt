import DifficultyButton from "../atoms/Button"

function DifficultyTemplate() {
  const difficultyList = [
    { name: "Easy" },
    { name: "Normal" },
    { name: "Hard" }
  ]
  
  const difficultyButtonSize = 400

  return (

    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="flex flex-col items-center w-full">
        {difficultyList.map((difficulty, idx) => (
          <DifficultyButton
            key={idx}
            maxSize={difficultyButtonSize}
            className="w-full block bg-orange-300 text-black px-2 py-2 rounded hover:bg-orange-400 transition-colors my-3"
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