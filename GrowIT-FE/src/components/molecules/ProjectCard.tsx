import ProjectCardImage from "../../assets/cards/paper_card.png"
import DecisionButton from "../atoms/DecisionButton"

type ProjectCardProps = {
  cardType: string;
  selected: boolean; // 카드의 선택 여부 표시
  onSelect: () => void; // 모달에서 카드 선택하면 배열에 추가하라
}

function ProjectCard({ cardType, selected, onSelect }: ProjectCardProps) {
  return (
    <div className="relative mx-3 w-[31%]">
      <img src={ProjectCardImage} alt="프로젝트 카드" className="w-full h-auto object-contain" />

      <div className="absolute inset-0 flex items-center justify-center">
        <DecisionButton 
          cardType={cardType}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}

export default ProjectCard
