// import hiringModalBackgroundImage from "../../assets/modals/monitor_modal_background.png"
// import DismissedCard from "../molecules/FiringCard"

// type FiringModalProps = {
//   onClose: () => void
// }

// function FiringModal({ onClose }: FiringModalProps) {
//   return (
//     <>
//       <div
//         className="fixed inset-0 flex justify-center items-start z-50 pointer-events-none overflow-hidden"
//       >
//         <div
//           className="mt-20 p-8 w-7/12 h-4/7 max-w-5xl relative pointer-events-auto"
//           style={{
//             backgroundImage: `url(${hiringModalBackgroundImage})`,
//             backgroundSize: "100% 100%",
//             backgroundPosition: "center"
//           }}
//         >
//           <button
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//           <div className="flex justify-center items-center">
//             <DismissedCard />
//             <DismissedCard />
//             <DismissedCard />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default FiringModal