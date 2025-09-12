import { useState } from "react"
import CloseButton from "../atoms/Button"
import projectModalBackgroundImage from "../../assets/modals/project_modal_background.png"
import ProjectCard from "../molecules/ProjectCard"

const projects = [
  { name: "National Project", turn: 5, reward: 1000000 },
  { name: "Company Project", turn: 7, reward: 2000000 },
  { name: "Outsourcing Project", turn: 10, reward: 3000000 }
]

type ProjectModalProps = {
  onClose: () => void
}

function ProjectModal({ onClose }: ProjectModalProps) {

  return (
    <>
      <div
        className="fixed inset-0 flex justify-center items-start z-50 pointer-events-none overflow-hidden"
      >
        <div
          className="mt-20 px-8 pt-6 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
          style={{
            backgroundImage: `url(${projectModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        >
          <div className="flex justify-between items-center mt-3">
            <p className="mx-6 font-bold text-3xl">프로젝트</p>
            <CloseButton
              className="
                bg-red-400
                text-black
                px-3
                py-0
                rounded
                hover:bg-red-500
                transition-colors
                mx-2
                text-clamp-title
                inline-flex
              "
              onClick={onClose}
            >
              X
            </CloseButton>
          </div>
          <div className="flex justify-center items-center p-0">
            { projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectModal




// import { useState } from "react"
// import BoardBackgroundImage from "../../assets/background_images/board_page_background_image2.png"
// import ProjectCard from "../molecules/ProjectCard"

// type ProjectModalProps = {
//   onClose: () => void;
// }

// const ProjectModal = ({ onClose }: ProjectModalProps) => {
//   // 여러 카드 선택 가능 
//   const [selectedCards, setSelectedCards] = useState<string[]>([])

//   // 카드 선택 처리
//   const handleSelectCard = (cardType: string) => {
//     if (!selectedCards.includes(cardType)) {
//       setSelectedCards([...selectedCards, cardType])
//       console.log(`${cardType} 선택완료`)
//     } else {
//       console.log(`${cardType} 이미 선택됨`)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
//       <div
//         className="mt-20 p-8 w-9/12 h-6/7 max-w-5xl relative pointer-events-auto"
//         style={{
//           backgroundImage: `url(${BoardBackgroundImage})`,
//           backgroundSize: "100% 100%",
//           backgroundPosition: "center"
//         }}
//       >
//         <button
//           className="absolute top-5 right-8 text-gray-500 hover:text-gray-800"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         <div className="flex mt-8 justify-center items-center">
//           <ProjectCard 
//             cardType="project1" // 첫번째 프로젝트 카드 타입임을 명시
//             selected={selectedCards.includes("project1")} // 첫번째 프로젝트 카드를 선택한 상태
//             onSelect={() => handleSelectCard("project1")} // 첫번째 프로젝트 카드 관련 정보를 넣을 배열 함수 
//           />
//           <ProjectCard 
//             cardType="project2"
//             selected={selectedCards.includes("project2")}
//             onSelect={() => handleSelectCard("project2")}
//           />
//           <ProjectCard 
//             cardType="project3"
//             selected={selectedCards.includes("project3")}
//             onSelect={() => handleSelectCard("project3")}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProjectModal
