import { useEffect, useState } from "react"
import CloseButton from "../atoms/Button"
import hiringModalBackgroundImage from "../../assets/modals/hiring_modal_background.png"
import ApplicantCard from "../molecules/ApplicantCard"
import applicantImage1 from "../../assets/applicants/applicant1.gif"
import applicantImage2 from "../../assets/applicants/applicant2.gif"
import applicantImage3 from "../../assets/applicants/applicant3.gif"

import applicantData from "../../assets/data/randomApplicants.json"
import { useSaveStore } from "../../stores/saveStore"
import { useGameDataStore } from "../../stores/gameDataStore"

// const applicants = [
//   { name: "Wirtz", position: "Programmer", salary: 70000, productivity: 7, applicantImage: applicantImage1 },
//   { name: "Salah", position: "Art Disigner", salary: 110000, productivity: 11, applicantImage: applicantImage2 },
//   { name: "Mac Alister", position: "Project Manager", salary: 100000, productivity: 10, applicantImage: applicantImage3 }
// ]

type HiringModalProps = {
  onClose: () => void
}

function HiringModal({ onClose }: HiringModalProps) {

  const gameDataStore = useGameDataStore()
  const [applicants, setApplicants] = useState<any[]>([])
  const currentSaveIdx = useSaveStore(state => state.currentSaveIdx)
  const hiringArray = useGameDataStore(state => state.hiringArray)

  // useEffect(() => {
  //   if (!hiringArray) return
    
  //   const newHirings = applicantData.map((hir, idx) => {
  //     const seletedIndex = hiringArray[idx]
  //     return {
  //       name: hir.name,
  //       position: hir.position,
  //       productivity: hir.productivity,
  //       imageIndex: hir.imageIndex,
  //       salary: hir.salary
  //     }
  //   })

  //   setApplicants(newHirings)
  // }, [hiringArray, currentSaveIdx])

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
    <>
      <div
        className="fixed inset-0 flex justify-center items-start z-50 pointer-events-none overflow-hidden"
      >
        <div
          className="mt-16 px-8 pt-6 pb-6 w-7/12 h-auto max-w-5xl relative pointer-events-auto"
          style={{
            backgroundImage: `url(${hiringModalBackgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center"
          }}
        >
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
          <div className="flex justify-center items-center p-0">
            { applicants.map((applicant, idx) => (
                <ApplicantCard key={idx} applicant={applicant} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HiringModal