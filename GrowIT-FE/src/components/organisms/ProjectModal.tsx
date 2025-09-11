import { useState } from "react"
import BoardBackgroundImage from "../../assets/background_images/board_page_background_image2.png"
import ProjectCard from "../molecules/ProjectCard"

type ProjectModalProps = {
  onClose: () => void;
}

const ProjectModal = ({ onClose }: ProjectModalProps) => {
  // 여러 카드 선택 가능 
  const [selectedCards, setSelectedCards] = useState<string[]>([])

  // 카드 선택 처리
  const handleSelectCard = (cardType: string) => {
    if (!selectedCards.includes(cardType)) {
      setSelectedCards([...selectedCards, cardType])
      console.log(`${cardType} 선택완료`)
    } else {
      console.log(`${cardType} 이미 선택됨`)
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <div
        className="mt-20 p-8 w-9/12 h-6/7 max-w-5xl relative pointer-events-auto"
        style={{
          backgroundImage: `url(${BoardBackgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        }}
      >
        <button
          className="absolute top-5 right-8 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex mt-8 justify-center items-center">
          <ProjectCard 
            cardType="project1" // 첫번째 프로젝트 카드 타입임을 명시
            selected={selectedCards.includes("project1")} // 첫번째 프로젝트 카드를 선택한 상태
            onSelect={() => handleSelectCard("project1")} // 첫번째 프로젝트 카드 관련 정보를 넣을 배열 함수 
          />
          <ProjectCard 
            cardType="project2"
            selected={selectedCards.includes("project2")}
            onSelect={() => handleSelectCard("project2")}
          />
          <ProjectCard 
            cardType="project3"
            selected={selectedCards.includes("project3")}
            onSelect={() => handleSelectCard("project3")}
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
