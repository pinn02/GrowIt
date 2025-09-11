import Board from '../assets/background_images/office_page_background_image.png'
import RandomText from '../components/molecules/RandomText'
import MainButton from '../components/atoms/MainButton'
import RandomTemplate from '../components/templates_work/RandomTemplate'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const RandomPage = () => {
    const navigate = useNavigate()

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 z-0 bg-cover bg-center board-animation" style={{ backgroundImage: `url(${Board})` }} />
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-8 gap-y-8">
                <RandomTemplate />
                <RandomText />
                <MainButton onClick={() => navigate("/main")} />
            </div>
        </div>
    )
}

export default RandomPage