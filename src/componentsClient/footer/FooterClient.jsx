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
            <a href="https://www.facebook.com/bemozik.antananarivo" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className='icon-footer' icon={faFacebook} />
            </a>
            <a href="mailto:bemozik@icloud.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className='icon-footer' icon={faEnvelope} />
            </a>
        </div>
    )
}

export default FooterClient;