import xButton from '../../assets/actions/x.jpg'

type ReportButtonProps = {
    onClose: () => void; 
}

const ReportButton = ({onClose}: ReportButtonProps) => {
    return (
    <div>
        <img src={xButton} className="absolute top-4 right-4 w-8 h-8 cursor-pointer z-10" alt="x이미지" onClick={onClose}/>
    </div>
    )
}
export default ReportButton