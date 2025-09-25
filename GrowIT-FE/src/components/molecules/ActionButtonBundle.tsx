import ActionButton from "../atoms/ActionButton"
import hiringImage from "../../assets/actions/hiring.png"
import marketingImage from "../../assets/actions/marketing.png"
import investmentImage from "../../assets/actions/investment.png"
import projectImage from "../../assets/actions/project.png"

// 각 액션 명칭과 이미지
const actions = [
  { name: "고용", actionImage: hiringImage },
  { name: "마케팅", actionImage: marketingImage },
  { name: "투자", actionImage: investmentImage },
  { name: "프로젝트", actionImage: projectImage },
]

type ActionButtonBundleProps = {
  openModal: (index: number) => void;
}

// 액션 버튼 묶음
function ActionButtonBundle({ openModal }: ActionButtonBundleProps) {
  return (
    <div className="flex flex-col space-y-4 absolute top-1/2 left-4 transform -translate-y-1/2">
      {actions.map((action, index) => (
        <ActionButton  // 액션 버튼마다 해당 액션 정보 전달
          key={index}
          name={action.name}
          actionImage={action.actionImage}
          onClick={() => openModal(index)}
        />
      ))}
    </div>
  )
}

export default ActionButtonBundle