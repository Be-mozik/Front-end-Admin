import './DropdownUser.css';
import { Link } from 'react-router-dom';
import utilisateurApi from '../../api/utilisateurApi';
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const DropdwnUser = ({ onCloseDrop }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const tokenName = 'token';
                const decoded = await utilisateurApi.getProfile(tokenName);
                if (decoded) {
                    setUser(decoded);
                } else {
                    console.log('Token non trouvé');
                    await handleDeco();
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile();
    }, []);


    const handleDeco = async () => {
        try {
            await utilisateurApi.deconnexion();
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la deconnection: ',error);
        }
    }

    return (
        <div className='flex flex-col dropdownUser'>
            <ul className='liste'>
                {user ? (
                    <li>{user.prenomutilisateur}</li>
                ) : (
                    <li></li>
                )}
                <Link className='link-custom-user' to="/">
                    <li onClick={handleDeco}>Se déconnecter</li>
                </Link>
                <li onClick={e => onCloseDrop()}>Fermer</li>
            </ul>
        </div>
    );
};

export default DropdwnUser;
