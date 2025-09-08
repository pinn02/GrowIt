import { useState } from 'react'

export default function Company() {
  const [employees, setEmployees] = useState([
    { id: 1, name: '김개발', position: 'Frontend Developer', salary: 400 },
    { id: 2, name: '이백엔드', position: 'Backend Developer', salary: 450 },
    { id: 3, name: '박디자인', position: 'UI/UX Designer', salary: 350 },
  ])
  const [totalSalary, setTotalSalary] = useState(employees.reduce((sum, emp) => sum + emp.salary, 0))

  const hireEmployee = () => {
    const newEmployee = {
      id: employees.length + 1,
      name: `신입${employees.length + 1}`,
      position: 'Junior Developer',
      salary: 300
    }
    const newEmployees = [...employees, newEmployee]
    setEmployees(newEmployees)
    setTotalSalary(newEmployees.reduce((sum, emp) => sum + emp.salary, 0))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏢 회사 관리</h1>
          <p className="text-gray-600">직원들을 관리하고 회사를 성장시키세요!</p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">👥 총 직원 수</h3>
            <p className="text-3xl font-bold">{employees.length}명</p>
          </div>
          <div className="bg-red-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">💸 월 총 급여</h3>
            <p className="text-3xl font-bold">₩{totalSalary.toLocaleString()}</p>
          </div>
          <div className="bg-green-500 text-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">📊 회사 레벨</h3>
            <p className="text-3xl font-bold">Level {Math.floor(employees.length / 3) + 1}</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">직원 목록</h2>
            <button
              onClick={hireEmployee}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              신입 채용하기
            </button>
          </div>
          
          <div className="grid gap-4">
            {employees.map((employee) => (
              <div key={employee.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-lg">{employee.name}</h3>
                  <p className="text-gray-600">{employee.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₩{employee.salary.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">월급</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            🎯 팀 교육 프로그램
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            🏆 성과 평가
          </button>
        </div>
      </div>
    </div>
  )
}