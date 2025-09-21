// ceo 카드 페이지네이션 부분 
type PageIndicatorProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PageIndicator({ totalPages, currentPage, onPageChange }: PageIndicatorProps) {
  return (
    <div className="flex space-x-2 mb-6">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx)}
          className={`
            w-3 h-3 rounded-full transition-colors
            ${currentPage === idx ? 'bg-orange-400' : 'bg-gray-600 hover:bg-gray-500'}
          `}
        />
      ))}
    </div>
  )
}

export default PageIndicator
