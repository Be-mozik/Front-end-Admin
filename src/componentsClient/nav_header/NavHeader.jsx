import './NavHeader.css'
import Logo from '../../assets/Logo.png'
import { BsBag } from "react-icons/bs"
import { GoPerson } from "react-icons/go";

const NavHeader = () => {
    return(
        <div className="header-container">
            <div className="logo-client">
                <img src={Logo} alt="Logobar" />
            </div>
            <div className="menu-bar">
                <ul className='menu'>
                    <li>Event</li>
                    <li>Artiste</li>
                    <li>A propos</li>
                    <li>Mes achats</li>
                </ul>
            </div>
            <div className="icon-header">
                <BsBag />
                <GoPerson />
            </div>
        </div>
    )
}

export default NavHeader