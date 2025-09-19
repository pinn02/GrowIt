import { useGameDataStore } from "../../stores/gameDataStore"
import { useButtonStore } from "../../stores/buttonStore"
import SelectButton from "../atoms/Button"
import projectCardImage from "../../assets/cards/paper_card.png"

type Project = {
  name: string
  reward: number
  image: string
  action?: string
  turn: number
}

type ProjectCardProps = {
  project: Project
}

const selectButtonSize = 200  // 선택 버튼 최대 사이즈

// 프로젝트 카드
function ProjectCard({ project }: ProjectCardProps) {
  const gameDataStore = useGameDataStore()
  const projectButton = useButtonStore((state) => state.projectButton)
  const setProjectButton = useButtonStore((state) => state.setProjectButton)

  // 프로젝트 선택 시 이벤트
  const projectSelected = (pName: string, pTurn: number, pReward: number) => {
    gameDataStore.setCurrentProject({
      name: pName,
      turn: pTurn,
      reward: pReward,
    })
    setProjectButton(false)
  }

  return (
    <div className="relative w-[30%] h-auto mx-3 my-3">
      {/* 배경 이미지 */}
      <img src={projectCardImage} alt="프로젝트 카드" className="w-full h-auto" />

      {/* 프로젝트 데이터 */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 h-[90%]">
        {/* 프로젝트 이름 */}
        <p className="font-bold text-2xl text-clamp-title text-center w-[80%] ps-8">
          {project.name}
        </p>
        {/* 프로젝트 이미지 */}
        <div className="w-1/2 flex justify-center">
          <img src={project.image} alt={`${project.name} 아이콘`} className="w-full h-auto object-contain" />
        </div>
        {/* 프로젝트 데이터 */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="text-xs text-clamp-base leading-relaxed text-center px-1 font-medium text-gray-700 flex items-center justify-center">
            {project.action}
          </p>
          <p className="text-clamp-base">
            보수: {project.reward.toLocaleString()}G
          </p>
          <div className="mt-4 w-full">
            <SelectButton
              disabled={!projectButton}
              maxSize={selectButtonSize}
              className={`w-[80%] rounded transition-colors mx-3 truncate ${
                projectButton
                ? "bg-orange-400 text-black hover:bg-orange-500"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              onClick={() => projectSelected(project.name, project.turn, project.reward)}
            >
              {projectButton ? "선택" : "프로젝트 진행 중"}
            </SelectButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard