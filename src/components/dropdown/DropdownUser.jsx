import './DropdownUser.css'

const DropdwnUser = ({ onCloseDrop }) => {

    return(
        <div className='flex flex-col dropdownUser'>
            <ul className='liste'>
                <li>User 1</li>
                <li>Se deconnecter</li>
                <li onClick={e => onCloseDrop()}>Fermer</li>
            </ul>
        </div>
    )
}

export default DropdwnUser