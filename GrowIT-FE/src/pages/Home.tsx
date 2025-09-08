import { useState } from 'react'

export default function Home() {
  const [money, setMoney] = useState(1000)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌱 GrowIT Home</h1>
          <p className="text-gray-600">당신의 IT 회사를 성장시켜보세요!</p>
        </div>
        
        {/* Money Display */}
        <div className="bg-green-500 text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">💰 현재 자금</h2>
              <p className="text-3xl font-bold">₩ {money.toLocaleString()}</p>
            </div>
            <div className="text-6xl opacity-20">💸</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setMoney((m) => m + 50)}
          >
            📱 SNS 마케팅 (+50원)
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setMoney((m) => m + 100)}
          >
            🚀 프로젝트 완료 (+100원)
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setMoney((m) => m + 200)}
          >
            💼 대기업 계약 (+200원)
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setMoney((m) => m - 50)}
          >
            📉 비용 지출 (-50원)
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600">회사 상태</h3>
            <p className="text-lg font-bold text-blue-600">성장 중</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600">직원 수</h3>
            <p className="text-lg font-bold text-green-600">15명</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
            <h3 className="text-sm font-medium text-gray-600">프로젝트</h3>
            <p className="text-lg font-bold text-purple-600">3개 진행중</p>
          </div>
        </div>
      </div>
    </div>
  )
}