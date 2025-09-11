// 랜덤 이벤트 페이지의 배경
import RandomImage from "../../assets/images/bankruptcy.png"
import '../../index.css' 

const RandomTemplate = () => {
    return (
    <div className="board-animation w-[40%] h-[40%]">
        <img src={RandomImage} alt="랜덤 이미지" />
    </div>
    )
}
export default RandomTemplate