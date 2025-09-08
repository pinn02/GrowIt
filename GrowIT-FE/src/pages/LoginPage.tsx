import LoginButton from "../components/atoms/LoginButton";
import loginPageBackgroundImage from "../assets/background_images/login_page_background_image.png";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 flex w-[200%] h-full animate-scrollX">
        <img
          src={ loginPageBackgroundImage }
          alt="로그인 화면"
          className="w-1/2 h-full object-cover"
        />
        <img
          src={ loginPageBackgroundImage }
          alt="로그인 화면"
          className="w-1/2 h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
        <div className="text-center">
          <img
            src={ logo }
            alt="GrowIT"
            className="block w-full h-auto max-w-[600px] animate-shine mb-8"
          />
          <LoginButton to="/main">
            <FontAwesomeIcon icon={ faKakaoTalk } className="mr-2" />
            카카오 로그인
          </LoginButton>
        </div>
      </div>
    </div>
  )
}

export default LoginPage