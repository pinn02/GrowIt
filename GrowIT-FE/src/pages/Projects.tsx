import { useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: '쇼핑몰 웹사이트', 
      client: '패션 스타트업', 
      status: '진행중', 
      progress: 65, 
      reward: 800,
      difficulty: '중급'
    },
    { 
      id: 2, 
      name: '모바일 게임 앱', 
      client: '게임 회사', 
      status: '계획중', 
      progress: 15, 
      reward: 1200,
      difficulty: '고급'
    },
    { 
      id: 3, 
      name: '기업 홈페이지', 
      client: '중소기업', 
      status: '완료', 
      progress: 100, 
      reward: 500,
      difficulty: '초급'
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료': return 'bg-green-100 text-green-800'
      case '진행중': return 'bg-blue-100 text-blue-800'
      case '계획중': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '고급': return 'bg-red-100 text-red-800'
      case '중급': return 'bg-orange-100 text-orange-800'
      case '초급': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const addNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `새 프로젝트 ${projects.length + 1}`,
      client: '신규 클라이언트',
      status: '계획중',
      progress: 0,
      reward: Math.floor(Math.random() * 1000) + 300,
      difficulty: ['초급', '중급', '고급'][Math.floor(Math.random() * 3)]
    }
    setProjects([...projects, newProject])
  }

  const completedProjects = projects.filter(p => p.status === '완료').length
  const activeProjects = projects.filter(p => p.status === '진행중').length
  const totalEarnings = projects.filter(p => p.status === '완료').reduce((sum, p) => sum + p.reward, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 프로젝트 관리</h1>
          <p className="text-gray-600">진행 중인 프로젝트를 관리하고 새로운 기회를 찾아보세요!</p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">🚀 진행중</h3>
            <p className="text-3xl font-bold">{activeProjects}</p>
          </div>
          <div className="bg-green-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">✅ 완료</h3>
            <p className="text-3xl font-bold">{completedProjects}</p>
          </div>
          <div className="bg-purple-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">💰 총 수익</h3>
            <p className="text-3xl font-bold">₩{totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">📊 전체</h3>
            <p className="text-3xl font-bold">{projects.length}</p>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">프로젝트 목록</h2>
            <button
              onClick={addNewProject}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              새 프로젝트 추가
            </button>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-2">클라이언트: {project.client}</p>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">₩{project.reward.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">보상금</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            🔍 새 프로젝트 찾기
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            📈 프로젝트 분석
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            🎯 목표 설정
          </button>
        </div>
      </div>
    </div>
  )
}