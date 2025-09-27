import { useEffect } from "react"
import { trackModalOpen } from "../../config/ga4Config"

type ProductivityModalProps = {
  isOpen: boolean
  onClose: () => void
}

// 생산성 모달 컴포넌트
function ProductivityModal({ isOpen }: ProductivityModalProps) {
  useEffect(() => {
    if (isOpen) {
      trackModalOpen('productivity');
    }
  }, [isOpen]);
  
  if (!isOpen) return null

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* 작은 툴팁 형태 모달 */}
      <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-300 text-sm whitespace-nowrap relative">
        {/* 내용 */}
        <div className="space-y-1">
          <p className="text-gray-800">• 회사의 생산 효율을 나타냅니다</p>
          <p className="text-gray-800">• 생산성 500 당 프로젝트 보상이 10% 증가합니다</p>
        </div>
      </div>
    </div>
  )
}

export default ProductivityModal
