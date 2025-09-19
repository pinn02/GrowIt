import { useState } from "react"
import Button from "../atoms/Button"

type CompanyNameModalProps = {
  onSubmit: (name: string) => void
}

function CompanyNameModal({ onSubmit }: CompanyNameModalProps) {
  const [name, setName] = useState("")

  // 회사 이름 데이터 제출 기능
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name)
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
    >
      <div
        className="w-1/3 h-auto bg-orange-100 rounded-2xl pointer-events-auto pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center"
        >
          <input
            type="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="회사 이름을 정해주세요"
            className="bg-white block w-[80%] mx-3 p-3 my-4 text-lg rounded-md border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* 생성 버튼 */}
          <Button
            type="submit"
            className="w-[80%] bg-orange-400 text-white px-4 py-3 my-3 rounded hover:bg-orange-500 transition-colors text-lg font-bold"
          >
            결정
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CompanyNameModal