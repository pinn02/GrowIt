// 메인 페이지로 라우터 이동하는 페이지


type MainButtonProps = {
  onClick: () => void
}

const MainButton = ({ onClick }: MainButtonProps) => {
    return (
    <button
      onClick={onClick}
        className="
        relative px-6 py-3 rounded-md
        bg-gray-800 text-white border-2 border-white 
        shadow-md shadow-gray-900 hover:bg-gray-700
        active:shadow-none active:translate-y-0.5 transition-all duration-75 ease-in-out"
    >
      확인
    </button>
    )
}
export default MainButton
