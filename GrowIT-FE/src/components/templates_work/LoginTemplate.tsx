import LoginButton from "../atoms/Button";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";

type LoginTemplateProps = {
  onLogin: () => void
}

function LoginTemplate({ onLogin }: LoginTemplateProps) {
  const loginButtonSize = 400;

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center">
        <img
          src={ logo }
          alt="GrowIT"
          className="block w-full h-auto max-w-[600px] animate-shine mb-8"
        />
        <LoginButton
          // to="/main"
          onClick={onLogin}
          maxSize={loginButtonSize}
          className="w-full bg-yellow-300 text-black px-2 py-2 rounded hover:bg-yellow-400 transition-colors"
        >
          <FontAwesomeIcon icon={ faKakaoTalk } className="mr-2" />
          카카오 로그인
        </LoginButton>
      </div>
    </div>
  )
}

export default LoginTemplate