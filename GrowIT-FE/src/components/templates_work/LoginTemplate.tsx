import { authApi } from "../../api/authApi";
import LoginButton from "../atoms/Button";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";
import LoginModal from "../organisms/LoginModal";
import { useState } from "react";

const userId = "test"
const userPassword = "1234"

type LoginTemplateProps = {
  onLogin: () => void
}

function LoginTemplate({ onLogin }: LoginTemplateProps) {
  const loginButtonSize = 400;
  const [activeLoginModal, setActiveLoginModal] = useState(false) 

  const handleKakaoLogin = () => {
    authApi.loginWithKakao();
  }

  const handleNormalLogin = (id: string, pw: string) => {
    if (id === userId && pw === userPassword) {
      onLogin()
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.")
    }
  }

  const onLoginModal = () => {
    setActiveLoginModal(true)
  }

  const handleCloseModal = () => {
    setActiveLoginModal(false)
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center">
        <img
          src={logo}
          alt="GrowIT"
          className="block w-full h-auto max-w-[600px] animate-shine mb-12"
        />
        
        <LoginButton
          onClick={handleKakaoLogin}
          maxSize={loginButtonSize}
          className="w-2/3 bg-yellow-300 text-black font-bold px-5 py-5 my-3 rounded hover:bg-yellow-400 transition-colors"
        >
          <FontAwesomeIcon icon={faKakaoTalk} className="mr-2" />
          카카오 로그인
        </LoginButton>
        
        <LoginButton
          onClick={onLoginModal}
          maxSize={loginButtonSize}
          className="w-2/3 bg-orange-400 font-bold text-white px-5 py-5 my-3 rounded hover:bg-orange-500 transition-colors"
        >
          로그인
        </LoginButton>
        
        {activeLoginModal && (
          <LoginModal
            onClose={handleCloseModal}
            onSubmit={handleNormalLogin}
          />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
