import ActionButton from "../atoms/ActionButton"
import hiringImage from "../../assets/actions/hiring.png"
import marketingImage from "../../assets/actions/marketing.png"
import investmentImage from "../../assets/actions/investment.png"
import projectImage from "../../assets/actions/project.png"

const actions = [
  { name: "고용", actionImage: hiringImage },
  { name: "마케팅", actionImage: marketingImage },
  { name: "투자", actionImage: investmentImage },
  { name: "프로젝트", actionImage: projectImage },
]

function ActionButtonBundle() {
  return (
    <div className="flex w-full justify-center">
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          name={action.name}
          actionImage={action.actionImage}
        />
      ))}
    </div>
  )
}

export default ActionButtonBundle