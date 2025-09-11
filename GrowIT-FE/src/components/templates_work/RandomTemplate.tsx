// 랜덤 이벤트 페이지의 배경
import RandomImage from "../../assets/images/bankruptcy.png"
import '../../index.css' 

const RandomTemplate = () => {
    return (
    <div className="board-animation w-full max-w-lg h-auto flex justify-center items-center">
        <img 
            src={RandomImage} 
            alt="랜덤 이미지" 
            className="w-full h-auto object-contain" 
        />
    </div>
    )
}
export default RandomTemplate