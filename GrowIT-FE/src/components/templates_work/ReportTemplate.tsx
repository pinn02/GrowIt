import Board from '../assets/background_images/board_page_background_image.png'
import ReportText from '../molecules/ReportText'
import ReportButton from '../atoms/ReportButton'

const ReportTemplate = () => {
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

export default ReportTemplate
