import ReportText from "../molecules/ReportText";
import ReportButton from "../atoms/ReportButton";

type ReportModalProps = {
  onClose: () => void;
}

function ReportModal({ onClose }: ReportModalProps) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div className="bg-white rounded-3xl p-8 w-11/12 max-w-xl relative">

        <ReportButton onClose={onClose} />

        <h2 className="text-2xl font-bold mb-4 text-center">게임 리포트</h2>
        
        <div className="mt-6">
        <ReportText isModal={true} />
        </div>
        </div>
      </div>
    </>
  )
}

export default ReportModal
