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
          className="w-2/3 bg-yellow-300 text-black font-bold px-5 py-5 my-3 rounded hover:bg-orange-500 transition-colors"
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

// import axios from "axios";
// import { useUserStore } from "../../stores/userStore";
// import LoginButton from "../atoms/Button";
// import logo from "../../assets/images/logo.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faKakaoTalk } from "@fortawesome/free-brands-svg-icons";
// import LoginModal from "../organisms/LoginModal";
// import { useState } from "react";

// const userId = "test"
// const userPassword = "1234"


// type LoginTemplateProps = {
//   onLogin: () => void
// }

// function LoginTemplate({ onLogin }: LoginTemplateProps) {
//   const loginButtonSize = 400;
//   const userStore = useUserStore()
//   const loginURL = "http://localhost:8080/oauth2/authorization/kakao"
//   const [activeLoginModal, setActiveLoginModal] = useState(false) 


//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(loginURL, {
//         username: "",
//         password: ""
//       })
//       console.log("success", response.data)
//       userStore.token = response.data.token
//       onLogin()
//     } catch (error) {
//       console.error("fail", error)
//     }
//   }

//   const handleNormalLogin = (id: string, pw: string) => {
//     if (id === userId && pw === userPassword) {
//       onLogin()
//     } else {
//       alert("아이디 또는 비밀번호가 틀렸습니다.")
//     }
//   }

//   const onLoginModal = () => {
//     setActiveLoginModal(true)
//   }

//   const handleCloseModal = () => {
//     setActiveLoginModal(false)
//   }

//   return (
//     <div className="flex items-center justify-center w-full h-full relative z-10 px-16">
//       <div className="text-center">
//         <img
//           src={ logo }
//           alt="GrowIT"
//           className="block w-full h-auto max-w-[600px] animate-shine mb-12"
//         />
//         <LoginButton
//           // to="/main"
//           // onClick={handleLogin}
//           onClick={onLogin}
//           maxSize={loginButtonSize}
//           className="w-2/3 bg-yellow-300 text-black font-bold px-5 py-5 my-3 rounded hover:bg-orange-500 transition-colors"
//         >
//           <FontAwesomeIcon icon={ faKakaoTalk } className="mr-2" />
//           카카오 로그인
//         </LoginButton>
//         <LoginButton
//           onClick={onLoginModal}
//           maxSize={loginButtonSize}
//           className="w-2/3 bg-orange-400 font-bold text-white px-5 py-5 my-3 rounded hover:bg-orange-500 transition-colors"
//         >
//           로그인
//         </LoginButton>
//         {activeLoginModal && (
//           <LoginModal
//             onClose={handleCloseModal}
//             onSubmit={handleNormalLogin}
//           />)}
//       </div>
//     </div>
//   )
// }

// export default LoginTemplate