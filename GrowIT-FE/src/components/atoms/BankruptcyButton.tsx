import xButton from '../../assets/actions/x.jpg'
import { useNavigate } from 'react-router-dom'

const BankruptcyButton = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    return (
    <div>
        <img src={xButton} className="absolute top-4 right-4 w-8 h-8 cursor-pointer z-10" alt="x이미지" onClick={handleClick}/>
    </div>

    )
}
export default BankruptcyButton