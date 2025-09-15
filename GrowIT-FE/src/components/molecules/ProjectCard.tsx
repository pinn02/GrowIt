import { useState } from "react"
import projectCardImage from "../../assets/cards/paper_card.png"
import SelectButton from "../atoms/Button"

type Project = {
  name: string
  turn: number
  reward: number
  image: string
}

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("선택");

  const handleSelect = () => {
    console.log(`${project.name} 프로젝트를 선택했습니다.`);
    setIsDisabled(true);
    setButtonText("선택 완료!");
  };

  return (
    <div className="relative w-[30%] h-auto mx-3 my-3">
      <img
        src={projectCardImage}
        alt="프로젝트 카드"
        className="w-full h-auto"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-5 space-y-4 translate-y-8">
        <p className="font-bold text-clamp-title text-center">
          {project.name}
        </p>

        <div className="w-3/4 h-20 flex justify-center">
          <img
            src={project.image}
            alt={`${project.name} 아이콘`}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-full flex flex-col items-center text-center space-y-3">
          <p className="text-clamp-base">턴: {project.turn}</p>
          <p className="text-clamp-base">
            비용: {project.reward.toLocaleString()}G
          </p>
          <div className="mt-2 w-full">
            <SelectButton
              disabled={isDisabled}
              className={`w-full py-2 rounded transition-colors ${
                isDisabled
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-orange-400 text-black hover:bg-orange-500"
              }`}
              onClick={handleSelect}
            >
              {buttonText}
            </SelectButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
