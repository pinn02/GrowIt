// 기업가치, 생산성, 자본, 직원 수 이전턴에서 변화량 조회 가능 페이지
import Board from '../assets/background_images/board_page_background_image.png'
import ReportText from '../components/molecules/ReportText'
import ReportButton from '../components/atoms/ReportButton'

const Report = () => {
    return (
        <div className="relative incline-block">
            <ReportButton />
            <img src={Board} alt="리포트 이미지" className="w-full h-full object-contain" />
            <div className="absolute inset-0">
                <ReportText />
            </div>
        </div>
    )
}

export default Report
