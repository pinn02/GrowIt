import { useState } from "react"
import Button from "../atoms/Button"

type LoginModalProps = {
  onClose: () => void
  onSubmit: (id: string, pw: string) => void
}

function LoginModal({ onClose, onSubmit }: LoginModalProps) {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  // 로그인 데이터 제출 기능
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
        className="w-1/3 h-auto bg-orange-100 rounded-2xl pointer-events-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          {/* 닫기 버튼 */}
          <Button
            onClick={onClose}
            className="bg-orange-400 text-white px-4 py-2 my-3 rounded hover:bg-orange-500 transition-colors m-3"
          >
            X
          </Button>
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
            className="bg-white block w-[80%] mx-3 p-3 my-4 text-lg rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="bg-white block w-[80%] mx-3 p-3 my-4 text-lg rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-[80%] bg-orange-400 text-white px-4 py-3 my-3 rounded hover:bg-orange-500 transition-colors text-lg font-bold"
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal