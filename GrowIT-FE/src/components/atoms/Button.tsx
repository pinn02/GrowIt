import { useNavigate } from "react-router-dom"

type ButtonProps = {
  to?: string
  maxSize: number
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

function Button({ to, maxSize, className = "", onClick, children }: ButtonProps) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (to) {
      navigate(to)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <button
      style={{ maxWidth: `${maxSize}px` }}
      className={`w-full whitespace-nowrap ${className}`}
      onClick={ handleClick }
    >
      {children}
    </button>
  )
}

export default Button