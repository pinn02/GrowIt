import Board from '../assets/background_images/board_page_background_image.png'
import BankruptcyText from '../components/molecules/BankruptcyText'
import BankruptcyButton from '../components/atoms/BankruptcyButton'
import BankruptcyTemplate from '../components/templates_work/BankruptcyTemplate'

const BankruptcyPage = () => {
    return (
    <div className="relative incline-block">
        <BankruptcyButton />
        <img src={Board} alt="보드 이미지" className="w-full h-full object-contain" />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
            <div className="w-full flex justify-center">
                <BankruptcyTemplate />
            </div>

            <div className="w-full flex justify-center">
                <BankruptcyText />
            </div>
        </div>
    </div>

    )
}
export default BankruptcyPage