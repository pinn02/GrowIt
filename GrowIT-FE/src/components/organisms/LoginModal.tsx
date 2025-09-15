import { useState } from "react"
import CloseButton from "../atoms/Button"
import LoginButton from "../atoms/Button"

type LoginModalProps = {
  onClose: () => void
  onSubmit: (id: string, pw: string) => void
}

function LoginModal({ onClose, onSubmit }: LoginModalProps) {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(id, pw)
  }

  return (
    <div
      className="
        fixed
        inset-0
        w-full
        flex
        justify-center
        items-center
        z-50
        pointer-events-none
        overflow-hidden
        bg-black/50
      "
      onClick={onClose}
    >
      <div
        className="w-[30%] h-auto bg-yellow-100 rounded-2xl pointer-events-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <CloseButton
            onClick={onClose}
            className="bg-red-300 text-black px-2 py-2 my-3 rounded hover:bg-red-400 transition-colors m-3"
          >
            X
          </CloseButton>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center"
        >
          <input
            type="username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해주세요"
            className="bg-white block w-[80%] mx-3 p-1 my-2"
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="bg-white block w-[80%] mx-3 p-1 my-2"
          />
          <LoginButton
            type="submit"
            className="bg-orange-300 text-black px-2 py-2 my-3 rounded hover:bg-orange-400 transition-colors"
          >
            로그인
          </LoginButton>
        </form>
      </div>
    </div>
  )
}

export default LoginModal