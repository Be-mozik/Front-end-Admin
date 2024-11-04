import './FooterClient.css'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FooterClient = () => {
    return(
        <div className="container-footer">
            <img src={Logo} alt="Logobar" />
            <p>© Tous droits réservés</p>
            <FontAwesomeIcon className='icon-footer' icon={faFacebook} />
            <FontAwesomeIcon className='icon-footer'icon={faEnvelope} />

        </div>
    )
}

export default FooterClient;