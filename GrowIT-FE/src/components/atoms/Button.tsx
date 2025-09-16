import { useNavigate } from "react-router-dom"

type ButtonProps = {
  type?: "button" | "submit" | "reset"
  to?: string
  disabled?: boolean
  maxSize?: number
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

function Button({ type="button", to, disabled, maxSize, className = "", onClick, children }: ButtonProps) {
  const navigate = useNavigate()
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (to) {
      navigate(to)
    } else if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      style={maxSize ? { maxWidth: `${maxSize}px` } : undefined}
      className={`
        whitespace-nowrap
        ${className}
        ${disabled ? "opacity-50 cursor-not-allowed": ""}
      `}
      onClick={ handleClick }
    >
      {children}
    </button>
  )
}

export default Button