import { useState, useEffect } from "react"
import { useSaveStore } from "../../stores/saveStore";
import { useGameDataStore } from "../../stores/gameDataStore";
import CloseButton from "../atoms/Button"
import { trackModalOpen, trackModalClose } from "../../config/ga4Config";
import projectModalBackgroundImage from "../../assets/modals/project_modal_background.png"
import ProjectCard from "../molecules/ProjectCard"
import publicImage from "../../assets/icons/public.png";
import insideImage from "../../assets/icons/inside.png";
import globalImage from "../../assets/icons/global.png";
import projectData from "../../assets/data/randomProject.json";
import help2Icon from "../../assets/icons/help.png";

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
  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const projectArray = useGameDataStore(state => state.projectArray)
  const [projects, setProjects] = useState<Project[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // GA4 tracking
  const gameDataStore = useGameDataStore();
  
  useEffect(() => {
    trackModalOpen('project', {
      game_turn: gameDataStore.turn,
      current_project: gameDataStore.currentProject.name,
      productivity: gameDataStore.productivity,
    });
  }, []);

  const handleClose = () => {
    trackModalClose('project');
    onClose();
  };

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
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none" onClick={handleClose}>
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
        {/* 버튼들 */}
        <div className="absolute top-12 right-15 flex items-center gap-2">
          {/* 도움말 버튼 */}
          <button
            className="
              hover:bg-blue-100
              transition-colors
              p-2
              rounded
              inline-flex
              items-center
              justify-center
              cursor-pointer
            "
            onMouseEnter={() => setShowHelpModal(true)}
            onMouseLeave={() => setShowHelpModal(false)}
          >
            <img src={help2Icon} alt="도움말" className="w-6 h-6" />
          </button>
          {/* 닫기 버튼 */}
          <CloseButton
            className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:text-gray-900 transition-colors"
            onClick={handleClose}
          >
            X
          </CloseButton>
        </div>

        <h2 className="absolute top-14 left-1/2 -translate-x-1/2 text-center text-4xl font-extrabold text-white drop-shadow-lg">
          프로젝트
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-4">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
        
        {/* 도움말 모달 */}
        {showHelpModal && (
          <div 
            className="absolute top-16 right-20 z-50 pointer-events-none"
            onMouseEnter={() => setShowHelpModal(true)}
            onMouseLeave={() => setShowHelpModal(false)}
          >
            <div className="bg-white rounded-lg p-4 w-100 shadow-lg border border-gray-300 relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-black">프로젝트 시스템 도움말</h3>
              </div>
              <div className="text-black space-y-2">
                <div className="space-y-1 text-xs">
                  <p>• 1턴 당 1개의 프로젝트 방식을 선택할 수 있습니다</p>
                  <p>• 선택한 프로젝트 기간이 지나면 프로젝트 보상이 지급됩니다</p>
                  <p>• 프로젝트 진행 중에는 다른 프로젝트 의뢰를 받을 수 없습니다</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectModal