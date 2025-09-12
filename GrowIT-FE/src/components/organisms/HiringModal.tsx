import { useState } from "react"
import CloseButton from "../atoms/Button"
import hiringModalBackgroundImage from "../../assets/modals/hiring_modal_background.png"
import ApplicantCard from "../molecules/ApplicantCard"
import applicantImage1 from "../../assets/applicants/applicant1.png"
import applicantImage2 from "../../assets/applicants/applicant2.png"
import applicantImage3 from "../../assets/applicants/applicant3.png"


const applicants = [
  { applicantName: "Wirtz", position: "Programmer", salary: 70000, productivity: 7, applicantImage: applicantImage1 },
  { applicantName: "Salah", position: "Art Disigner", salary: 110000, productivity: 11, applicantImage: applicantImage2 },
  { applicantName: "Mac Alister", position: "Project Manager", salary: 100000, productivity: 10, applicantImage: applicantImage3 }
]

type HiringModalProps = {
  onClose: () => void
}

function HiringModal({ onClose }: HiringModalProps) {

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