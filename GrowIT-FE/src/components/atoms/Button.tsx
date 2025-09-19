import { useNavigate } from "react-router-dom"

// 기본 버튼 컴포넌트
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  to?: string;  // 클릭 시 Route 이동 경로
  disabled?: boolean;
  maxSize?: number; // 반응형 버튼의 최대 사이즈
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

function Button({ type="button", to, disabled, maxSize, className = "", onClick, children }: ButtonProps) {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return; // 비활성화 시 버튼 클릭 이벤트 무시
    if (to) { navigate(to) } else if (onClick) { onClick(e) };  // to 존재 시 해당 Route로 이동
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={maxSize ? { maxWidth: `${maxSize}px` } : undefined}
      className={`
        whitespace-nowrap
        ${disabled ? "opacity-50 cursor-not-allowed": ""}
        ${className}
      `}  // 버튼 텍스트 줄넘김 방지, 비활성화 시 반투명 효과
      onClick={ handleClick }
    >
      {children}
    </button>
  );
}

export default Button;