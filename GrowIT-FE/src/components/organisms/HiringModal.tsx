import { useEffect, useState } from "react"
import { useSaveStore } from "../../stores/saveStore"
import { useGameDataStore } from "../../stores/gameDataStore"
import CloseButton from "../atoms/Button"
import ApplicantCard from "../molecules/ApplicantCard"
import hiringModalBackgroundImage from "../../assets/modals/hiring_modal_background.png"
import applicantData from "../../assets/data/randomApplicants.json"
import help2Icon from "../../assets/icons/help2.png"
import { trackModalOpen, trackModalClose } from "../../config/ga4Config"

type HiringModalProps = {
  onClose: () => void
}

// 고용 모달
function HiringModal({ onClose }: HiringModalProps) {
  const gameDataStore = useGameDataStore()
  const [applicants, setApplicants] = useState<any[]>([])
  const [showHelpModal, setShowHelpModal] = useState(false)
  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const hiringArray = useGameDataStore(state => state.hiringArray)

  const hiringCount = useGameDataStore(state => state.hiredPerson.length)

  useEffect(() => {
    trackModalOpen('hiring');
  }, []);

  const handleClose = () => {
    trackModalClose('hiring');
    onClose();
  };

  // 모달 실행 시 직원 데이터 가져오는 로직
  useEffect(() => {
    if (!hiringArray) return;

    const newHirings: any[] = [];
    for (let i = 0; i < 3; i++) {
      const selectedIndex = gameDataStore.hiringArray[i];
      const hir = applicantData[selectedIndex];
      newHirings.push({
        id: hir.id,
        name: hir.name,
        position: hir.position,
        productivity: hir.productivity,
        imageIndex: hir.imageIndex,
        salary: hir.salary
      });
    }

    setApplicants(newHirings);
  }, [hiringArray, currentSaveIdx]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none overflow-hidden">
      {/* 모달 배경 이미지 */}
      <div
        className="px-8 pt-6 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
        style={{
          backgroundImage: `url(${hiringModalBackgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        }}
      >
        {/* 모달 이름과 버튼들 */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-3xl mx-3">고용</p>
            <p className="text-xl mx-3">현재 직원 수: {hiringCount}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* 도움말 버튼 */}
            <button
              className="
                hover:bg-blue-100
                transition-colors
                p-2
                rounded
                inline-flex
                items-center
                justify-center
                cursor-pointer
              "
              onMouseEnter={() => setShowHelpModal(true)}
              onMouseLeave={() => setShowHelpModal(false)}
            >
              <img src={help2Icon} alt="도움말" className="w-6 h-6" />
            </button>
            {/* 닫기 버튼 */}
            <CloseButton
              className="
                bg-red-400
                text-black
                px-3
                py-0
                rounded
                hover:bg-red-500
                transition-colors
                mx-2
                text-clamp-title
                inline-flex
              "
              onClick={handleClose}
            >
              X
            </CloseButton>
          </div>
        </div>
        {/* 모달 카드 */}
        <div className="flex justify-center items-center p-0">
          { applicants.map((applicant, idx) => (
              <ApplicantCard key={idx} applicant={applicant} />
            ))}
        </div>
        
        {/* 도움말 모달 */}
        {showHelpModal && (
          <div 
            className="absolute top-16 right-20 z-50 pointer-events-none"
            onMouseEnter={() => setShowHelpModal(true)}
            onMouseLeave={() => setShowHelpModal(false)}
          >
            <div className="bg-white rounded-lg p-4 w-80 shadow-lg border border-gray-300 relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-black">고용 시스템 도움말</h3>
              </div>
              <div className="text-black space-y-2">
                <div className="space-y-1 text-xs">
                  <p>• 각 지원자의 직책, 생산성, 급여를 확인하세요</p>
                  <p>• 1턴 당 3명의 지원자 중 1명만 선택할 수 있습니다</p>
                  <p>• 생산성 500 당 프로젝트 보상이 10% 상승합니다</p>
                  <p>• 직원 수 1명 당 프로젝트 기간이 1턴 단축됩니다</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HiringModal