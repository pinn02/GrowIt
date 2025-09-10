// 로그인 페이지로 가는 버튼
type LoginButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

const LoginButton = ({ onClick, children }: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      {children}
    </button>
  )
}

export default LoginButton
