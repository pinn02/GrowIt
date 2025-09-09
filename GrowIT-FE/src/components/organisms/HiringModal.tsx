type HiringModalProps = {
  onClose: () => void;
}

function HiringModal({ onClose }: HiringModalProps) {
  return (
    <>
      <div
        className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
      >
        <div
          className="bg-white rounded-3xl p-8 w-11/12 max-w-xl relative pointer-events-auto"
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">고용 모달</h2>
          <p>여기에 고용 관련 컨텐츠를 넣으세요.</p>
        </div>
      </div>
    </>
  )
}

export default HiringModal