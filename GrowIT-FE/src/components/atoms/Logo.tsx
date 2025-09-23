import { useNavigate } from "react-router-dom"
import logoImage from "../../assets/images/logo.png"

type LogoProps = {
	height: number
}

// 클릭 시 메인 페이지로 이동하는 로고 이미지
function Logo({ height }: LogoProps) {
  const navigate = useNavigate()

  return (
    <img
      src={ logoImage }
      alt="GrowIT"
      style={{ height: `${height}px` }}
      className="mx-3
        transition
        duration-300
        ease-in-out
        hover:-translate-y-0.5
        hover:brightness-75
        filter
      "
      onClick={() => navigate('/')}
    />
  )
}

export default Logo