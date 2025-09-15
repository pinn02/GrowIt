import SaveButton from "../atoms/Button";
import { useNavigate } from "react-router-dom";

type SelectSaveTemplateProps = {
  onIsNewGame: () => void
}

const saveList = [
  { name: "Save 1", enterpriseValue: 1000, updatedAt: "2025-01-01" },
  { name: "Save 2", enterpriseValue: 2000, updatedAt: "2025-02-02" },
  { name: "", enterpriseValue: 0, updatedAt: "" }
]

function SelectSaveTemplate({ onIsNewGame }: SelectSaveTemplateProps) {
  const saveButtonSize = 800;
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center w-1/2">
        {saveList.map((save, idx) => (
          <SaveButton
            key={idx}
            maxSize={saveButtonSize}
            className="w-9/10 bg-orange-300 text-black px-6 py-6 rounded hover:bg-orange-400 transition-colors my-5 font-bold"
            onClick={() =>
              save.name != "" ? navigate("/main") : onIsNewGame()
            }
          >
            {
              save.name != "" ? `${save.name} | 기업가치: ${save.enterpriseValue} | ${save.updatedAt}` : "New Game" 
            }
          </SaveButton>
        ))}
      </div>
    </div>
  )
}

export default SelectSaveTemplate