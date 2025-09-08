import { useNavigate } from "react-router-dom"

type ButtonProps = {
  to: string
  children: React.ReactNode
}

function Button({ to, children }: ButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      className="w-full max-w-[300px] bg-yellow-300 text-black px-8 py-2 rounded hover:bg-yellow-400 transition-colors"
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  )
}

export default Button