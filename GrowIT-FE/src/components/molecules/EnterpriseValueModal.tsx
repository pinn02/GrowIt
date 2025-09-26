import { useEffect } from "react"
import { trackModalOpen } from "../../config/ga4Config"

type EnterpriseValueModalProps = {
  isOpen: boolean
  onClose: () => void
}

// 기업 가치 모달 컴포넌트
function EnterpriseValueModal({ isOpen }: EnterpriseValueModalProps) {
  useEffect(() => {
    if (isOpen) {
      trackModalOpen('enterprise_value');
    }
  }, [isOpen]);
  
  if (!isOpen) return null

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* 작은 툴팁 형태 모달 */}
      <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-300 text-sm whitespace-nowrap relative">
        {/* 내용 */}
        <div className="space-y-1">
          <p className="text-gray-800">• 기업의 가치를 나타냅니다</p>
          <p className="text-gray-800">• 엔딩에서 기업의 규모를 정합니다</p>
        </div>
      </div>
    </div>
  )
}

export default EnterpriseValueModal
