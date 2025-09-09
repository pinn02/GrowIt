import { useNavigate } from "react-router-dom"
import logoImage from "../../assets/images/logo.png"


type LogoProps = {
	height: number
	// children: React.ReactNode
}

function Logo({ height }: LogoProps) {
  const navigate = useNavigate()

  return (
    <img
      src={ logoImage }
      alt="GrowIT"
      style={{ height: `${height}px` }}
      className="mx-3"
      onClick={() => navigate('/')}
    />
  )
}

export default Logo