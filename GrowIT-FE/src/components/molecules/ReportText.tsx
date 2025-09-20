const ReportText = ({ isModal: _isModal = false }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-full">
            <p className="font-bold text-gray-900 leading-relaxed" 
               style={{ fontSize: 'clamp(0.85rem, 2.2vw, 1.2rem)' }}>
                이번 턴의 경제 리포트를 확인하세요!
            </p>
            <p className="text-gray-800 leading-relaxed px-2" 
               style={{ fontSize: 'clamp(0.7rem, 1.8vw, 1rem)' }}>
                재화를 소비하여 해당 턴의 경제 상황을 상세히 알아보세요.
            </p>
        </div>
    )
}

export default ReportText