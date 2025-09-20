import Board from '../assets/background_images/board_page_background_image.png'
import ReportText from '../molecules/ReportText'
import ReportButton from '../atoms/ReportButton'

type ReportTemplateProps = {
    onClose: () => void;
}

const ReportTemplate = ({ onClose }: ReportTemplateProps) => {
    return (
        <div className="relative incline-block">
            <ReportButton onClose={onClose} />
            <img src={Board} alt="리포트 이미지" className="w-full h-full object-contain" />
            <div className="absolute inset-0">
                <ReportText />
            </div>
        </div>
    )
}

export default ReportTemplate