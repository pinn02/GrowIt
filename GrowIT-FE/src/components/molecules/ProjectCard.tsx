import ProjectCardImage from "../../assets/cards/paper_card.png"
import ProjectButton from "../atoms/ProjectButton"

function ProjectCard() {
  return (
    <div className="relative mx-3 w-[30%]">
      <img src={ProjectCardImage} alt="프로젝트 카드" className="w-full h-auto object-contain" />

      <div className="absolute inset-0 flex items-center justify-center">
        <ProjectButton />
      </div>
    </div>
  )
}

export default ProjectCard
