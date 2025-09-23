// import { useState, useEffect } from "react";
// import ReportText from "../molecules/ReportText";
// import ReportButton from "../atoms/ReportButton";
// import backgroundImage from "../../assets/background_images/board_page_background_image3.png";
// import '../../index.css';

// type ReportModalProps = {
//   onClose: () => void;
// }

// function ReportModal({ onClose }: ReportModalProps) {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     setShow(true);
//   }, []);

//   const handleClose = () => {
//     setShow(false);
//     setTimeout(() => {
//       onClose();
//     }, 100);
//   };

//   return (
//     <>
//       <div className={`fixed inset-0 flex justify-center items-center z-50 ${show ? 'fade-in' : 'fade-out'}`}
//         onClick={handleClose}
//       >
//         {/* 두루마리 이미지 전체 */}
//         <div className="w-[85%] h-[80%] max-w-5xl max-h-[85vh] relative"
//              onClick={(e) => e.stopPropagation()}
//              style={{
//                backgroundImage: `url(${backgroundImage})`,
//                backgroundSize: 'contain',
//                backgroundPosition: 'center',
//                backgroundRepeat: 'no-repeat'
//              }}
//         >
//           {/* 두루마리의 실제 콘텐츠 영역 - 스크롤 부분을 제외한 평평한 종이 부분만 */}
//           <div className="absolute inset-0 flex flex-col">
//             <div 
//               className="flex-1 flex flex-col relative"
//               style={{
//                 // 반응형 위한 % 비율 조정 
//                 marginTop: '18%',    
//                 marginBottom: '15%',
//                 marginLeft: '15%',   
//                 marginRight: '15%', 
//                 padding: '3% 5%'    
//               }}
//             >
//               {/* <div className="flex ps-20 mb-10">
//                 <div className="w-full">
//                   <p className="text-center">턴 리포트</p>
//                 </div>
//                 <p>닫기 버튼</p>
//               </div> */}
              
//               {/* X 버튼 */}
//               <div className="absolute top-3 right-20 mt-10 z-20">
//                 <ReportButton onClose={handleClose} />
//               </div>
              
//               {/* 제목 영역 */}
//               <div className="text-center mb-6">
//                 <h2 className="font-bold text-gray-900" 
//                     style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}>
//                   턴 리포트
//                 </h2>
//               </div>
              
//               <div className="flex-1 flex flex-col justify-center items-center px-4">
//                 <ReportText isModal={true} />
                
//                 <div className="mt-8">
//                   <button 
//                     className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
//                     style={{ 
//                       padding: 'clamp(0.4rem, 1.2vw, 0.7rem) clamp(0.8rem, 2vw, 1.2rem)',
//                       fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)'
//                     }}
//                     onClick={() => {
//                       // TODO: 재화 소비 로직 
//                       console.log('턴 리포트 구매');
//                     }}
//                   >
//                     <span>힌트 구매</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ReportModal;