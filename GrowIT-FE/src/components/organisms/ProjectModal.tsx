import { useState, useEffect } from "react"
import CloseButton from "../atoms/Button"
import projectModalBackgroundImage from "../../assets/modals/project_modal_background.png"
import ProjectCard from "../molecules/ProjectCard"
import publicImage from "../../assets/icons/public.png";
import insideImage from "../../assets/icons/inside.png";
import globalImage from "../../assets/icons/global.png";
import projectData from "../../assets/data/randomProject.json";
import { useSaveStore } from "../../stores/saveStore";
import { useGameDataStore } from "../../stores/gameDataStore";

const channelImages = [
  publicImage,
  insideImage,
  globalImage,
]

type Project = {
  name: string,
  reward: number,
  action: string,
  turn: number,
  image: string,
}

type ProjectModalProps = {
  onClose: () => void
}

function ProjectModal({ onClose }: ProjectModalProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const projectArray = useGameDataStore(state => state.projectArray)

  useEffect(() => {
    if (!projectArray) return
    
    const newProjects = projectData.map((pro, idx) => {
      const selectedIndex = projectArray[idx]
      return {
        name: pro.name,
        reward: pro.rewards[selectedIndex],
        action: pro.actions[selectedIndex],
        image: channelImages[idx],
        turn: pro.turn[selectedIndex]
      }
    })
    
    setProjects(newProjects);
  }, [projectArray, currentSaveIdx]);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none" onClick={onClose}>
        <div
          className="w-11/12 md:w-8/12 max-w-5xl relative rounded-xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: `url(${projectModalBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "6rem 2rem 2rem 2rem",
          }}
        >
          <CloseButton
            className="absolute top-12 right-15 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
            onClick={onClose}
          >
            X
          </CloseButton>

          <h2 className="absolute top-14 left-1/2 -translate-x-1/2 text-center text-4xl font-extrabold text-white drop-shadow-lg">
            프로젝트
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectModal