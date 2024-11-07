import './NavHeader.css';
import Logo from '../../assets/Logo.png';
import { BsBag } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { Link as LinkSimple, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import clientApi from '../../api/clientApi';

const NavHeader = () => {
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartCount = () => {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            return existingCart.length;
        };
        setCartCount(getCartCount());
        const handleCartUpdate = () => {
            setCartCount(getCartCount());
        };
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const handleDeco = async () => {
        try {
            await clientApi.deconnexionClient();
            navigate('/Connexion');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="header-container">
            <div className="logo-client">
                <img src={Logo} alt="Logobar" />
            </div>
            <div className="menu-bar">
                <ul className='menu'>
                    <li>
                        <LinkSimple 
                            to="/Accueil" 
                            className='link-custom'
                        >
                            Accueil
                        </LinkSimple>
                    </li>
                    <LinkSimple
                        to="/Apropos"
                        className='link-custom'    
                    >
                        <li>A propos</li>
                    </LinkSimple>
                    <LinkSimple
                        to="/Historique"
                        className='link-custom'    
                    >
                        <li>Mes achats</li>
                    </LinkSimple>
                </ul>
            </div>
            <div className="icon-header">
                <div className="cart-icon">
                    <LinkSimple to="/Panier" className="cart-link">
                        <BsBag />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </LinkSimple>
                </div>
                <MdLogout onClick={handleDeco} />
            </div>
        </div>
    );
}

export default NavHeader;
