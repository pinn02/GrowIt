import axios from "axios";
import { useUserStore } from "../../stores/userStore";
import LoginButton from "../atoms/Button";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";


type LoginTemplateProps = {
  onLogin: () => void
}

function LoginTemplate({ onLogin }: LoginTemplateProps) {
  const loginButtonSize = 400;
  const userStore = useUserStore()
  const loginURL = "http://localhost:8080/oauth2/authorization/kakao"

  const handleLogin = async () => {
    try {
      const response = await axios.post(loginURL, {
        username: "",
        password: ""
      })
      console.log("success", response.data)
      userStore.token = response.data.token
      onLogin()
    } catch (error) {
      console.error("fail", error)
    }
  }

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
          // onClick={handleLogin}
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