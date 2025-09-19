import { useEffect, useState } from "react"
// import { useSaveStore } from "../../stores/saveStore"
import { useGameDataStore } from "../../stores/gameDataStore"
import CloseButton from "../atoms/Button"
import ApplicantCard from "../molecules/ApplicantCard"
import hiringModalBackgroundImage from "../../assets/modals/hiring_modal_background.png"
import applicantData from "../../assets/data/randomApplicants.json"

type HiringModalProps = {
  onClose: () => void
}

// 고용 모달
function HiringModal({ onClose }: HiringModalProps) {
  const gameDataStore = useGameDataStore()
  const [applicants, setApplicants] = useState<any[]>([])
  // const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  // const hiringArray = useGameDataStore(state => state.hiringArray)

  // 모달 실행 시 직원 데이터 가져오는 로직
  useEffect(() => {
    // if (!hiringArray) return;

    const newHirings: any[] = [];
    for (let i = 0; i < 3; i++) {
      // const selectedIndex = gameDataStore.hiringArray[i];
      // const hir = applicantData[selectedIndex];
      // newHirings.push({
      //   id: hir.id,
      //   name: hir.name,
      //   position: hir.position,
      //   productivity: hir.productivity,
      //   imageIndex: hir.imageIndex,
      //   salary: hir.salary
      // });
    }

    setApplicants(newHirings);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 pointer-events-none overflow-hidden">
      {/* 모달 배경 이미지 */}
      <div
        className="mt-16 px-8 pt-6 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
        style={{
          backgroundImage: `url(${hiringModalBackgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center"
        }}
      >
        {/* 모달 이름과 닫기 버튼 */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-3xl mx-3">고용</p>
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
            onClick={onClose}
          >
            X
          </CloseButton>
        </div>
        {/* 모달 카드 */}
        <div className="flex justify-center items-center p-0">
          { applicants.map((applicant, idx) => (
              <ApplicantCard key={idx} applicant={applicant} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default HiringModal