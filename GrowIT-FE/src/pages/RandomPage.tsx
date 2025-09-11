import Board from '../assets/background_images/board_page_background_image.png'
import RandomText from '../components/molecules/RandomText'
import MainButton from '../components/atoms/MainButton'
import RandomTemplate from '../components/templates_work/RandomTemplate'
import { useNavigate } from 'react-router-dom'

const BankruptcyPage = () => {
    const navigate = useNavigate()
    
    return (
    <div className="relative incline-block">
        <img src={Board} alt="보드 이미지" className="w-full h-full object-contain" />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
            <div className="w-full flex justify-center">
                <RandomTemplate />
            </div>

            <div className="w-full flex justify-center">
                <RandomText />
            </div>

            <div>
                <MainButton onClick={()=>navigate("/main")}/>
            </div>
        </div>
    </div>

    )
}
export default BankruptcyPage