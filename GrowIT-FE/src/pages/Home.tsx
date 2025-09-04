import { useState } from 'react'

export default function HomePage() {
  const [money, setMoney] = useState(1000)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">GrowIT Home</h1>
      <p className="mt-2">자금: {money}</p>
      <button
        className="mt-3 px-3 py-2 rounded-md border hover:bg-gray-50 transition"
        onClick={() => setMoney((m) => m + 30)}
      >
        SNS 성공 (+30)
      </button>
    </div>
  )
}