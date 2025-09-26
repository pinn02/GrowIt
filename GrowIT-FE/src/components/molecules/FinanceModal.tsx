import { useEffect } from "react"
import { trackModalOpen } from "../../config/ga4Config"

type FinanceModalProps = {
  isOpen: boolean
  onClose: () => void
}

// 자본 모달 컴포넌트
function FinanceModal({ isOpen }: FinanceModalProps) {
  useEffect(() => {
    if (isOpen) {
      trackModalOpen('finance');
    }
  }, [isOpen]);
  
  if (!isOpen) return null

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* 작은 툴팁 형태 모달 */}
      <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-300 text-sm whitespace-nowrap relative">
        {/* 내용 */}
        <div className="space-y-1">
          <p className="text-gray-800">• 고용, 마케팅, 투자, 스토어 업그레이드를 할 수 있는 재화입니다</p>
          <p className="text-gray-800">• 0 미만으로 떨어질 시 파산합니다</p>
        </div>
      </div>
    </div>
  )
}

export default FinanceModal
