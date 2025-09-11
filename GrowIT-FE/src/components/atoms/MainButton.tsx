// 메인 페이지로 라우터 이동하는 페이지
import ButtonImage from '../../assets/buttons/button.png'


type MainButtonProps = {
  onClick: () => void
}

const MainButton = ({ onClick }: MainButtonProps) => {
    return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      확인
    </button>
    )
}
export default MainButton
