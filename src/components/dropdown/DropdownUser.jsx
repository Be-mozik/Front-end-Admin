import './DropdownUser.css'
import { Link } from 'react-router-dom'

const DropdwnUser = ({ onCloseDrop }) => {

    return(
        <div className='flex flex-col dropdownUser'>
            <ul className='liste'>
                <li>User 1</li>
                <Link className='link-custom-user' to="/">
                    <li>Se deconnecter</li>
                </Link>
                <li onClick={e => onCloseDrop()}>Fermer</li>
            </ul>
        </div>
    )
}

export default DropdwnUser