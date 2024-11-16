import React, { useState } from "react"
import './Login.css'
import Logo from '../../assets/Logo.png'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import utilisateur from "../../api/utilisateurApi"

const Login = () => {
    const [mail,setMail] = useState('');
    const [pass,setPass] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLoading = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = { mail: mail,pass: pass };
            const rep = await utilisateur.connexion(data);
            if (rep) {
                localStorage.setItem('token', rep.token);
                window.location.href = '/dashboard';
            } else {
                setError('Aucun token reçu, problème de connexion.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Erreur lors de la connexion, veuillez réessayer.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <body className="bg-other">
        <div className="container1-login">
            <div className="headerlogin">
                <div className="logologin">
                    <img src={Logo} alt="headerlogin" />
                </div>
            </div>
            <form onSubmit={handleLoading}>
            <div className="inputs-login">
                <div className="input-login">
                    <MdEmail />
                    <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} required/>
                </div>
                <div className="input-login">
                    <RiLockPasswordFill />
                    <input type="password" placeholder="Mot de passe" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                </div>
            </div>
            <div className="submit-container-login">
                <button className="btn-submit-login" type="submit" disabled={loading}>Se connecter</button>
            </div>
            {error &&
                <div className="container-msg-error">
                    <p>{error}</p>
                </div>
            }
            </form>
            <div className="demande-login">Envoyer une demande <Link to="/demande" className="link-custom"><span>ici</span></Link></div>
        </div>
        </body>
    )
}

export default Login