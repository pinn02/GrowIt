import { useState } from "react";
import { authApi } from "../../api/authApi";
import LoginModal from "../organisms/LoginModal";
import LoginButton from "../atoms/Button";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";

// 테스트 로그인용 임시 계정
const userId = "1"
const userPassword = "1"

const loginButtonSize = 400;  // 로그인 버튼 최대 사이즈

type LoginTemplateProps = {
  onLogin: () => void
}

// 로그인 템플릿
function LoginTemplate({ onLogin }: LoginTemplateProps) {
  const [activeLoginModal, setActiveLoginModal] = useState(false) 

  // 카카오 로그인
  const handleKakaoLogin = () => {
    authApi.loginWithKakao();
  }

  // 임시 로그인 기능
  const handleNormalLogin = (id: string, pw: string) => {
    if (id === userId && pw === userPassword) { 
      setActiveLoginModal(false)  // 모달 닫기
      onLogin() 
    } else { 
      alert("아이디 또는 비밀번호가 틀렸습니다.") 
    }
  }

  // 로그인 모달 열기
  const onLoginModal = () => {
    setActiveLoginModal(true)
  }

  // 모달 닫기
  const handleCloseModal = () => {
    setActiveLoginModal(false)
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
      <div className="text-center">
        {/* 로고 이미지 */}
        <img src={logo} alt="GrowIT" className="block w-full h-auto max-w-[600px] animate-shine mb-12" />
        {/* 카카오 로그인 버튼 */}
        <LoginButton
          onClick={handleKakaoLogin}
          maxSize={loginButtonSize}
          className="w-2/3 bg-yellow-300 text-black font-bold px-5 py-5 my-3 rounded hover:bg-yellow-400 transition-colors"
        >
          <FontAwesomeIcon icon={faKakaoTalk} className="mr-2" />
          카카오 로그인
        </LoginButton>
        {/* 테스트 로그인 버튼 */}
        <LoginButton
          onClick={onLoginModal}
          maxSize={loginButtonSize}
          className="w-2/3 bg-orange-400 font-bold text-white px-5 py-5 my-3 rounded hover:bg-orange-500 transition-colors"
        >
          로그인
        </LoginButton>
        
        {/* 로그인 모달 */}
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
