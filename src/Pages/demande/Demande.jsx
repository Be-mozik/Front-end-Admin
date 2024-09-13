import React from "react"
import Logo from '../../assets/Logo.png'
import './Demande.css'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { RiAccountBoxFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { useState } from "react"
import demandeApi from "../../api/demandeApi"


const Demande = () => {
    const [prenom,setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [mdp1, setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');

    const [error , setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLoading = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const data = {prenomdemande: prenom, maildemande: mail, mdp1: mdp1, mdp2: mdp2};
            const rep = await demandeApi.demander(data);
            if(rep){
                setSuccess(rep.success);
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }finally {
            setLoading(false);
        }
    }

    return(
        <body className="bg-other">
            <div className="container-demande">
                <div className="header-demande">
                    <div className="logo-demande">
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <form onSubmit={handleLoading}>
                    <div className="inputs-demande">
                        <div className="input-demande">
                            <RiAccountBoxFill />
                            <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        </div>
                        <div className="input-demande">
                            <MdEmail />
                            <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} required/>
                        </div>
                        <div className="input-demande">
                            <RiLockPasswordLine />
                            <input type="password" placeholder="Mot de passe" value={mdp1} onChange={(e) => setMdp1(e.target.value)} required />
                        </div>
                        <div className="input-demande">
                            <RiLockPasswordLine />
                            <input type="password" placeholder="Confirmer votre mot de passe" value={mdp2} onChange={(e) => setMdp2(e.target.value)} required />
                        </div>
                    </div>
                    <div className="submit-container-demande">
                        <button className="btn-submit-demande" type="submit" disabled={loading}>Envoyer une demande</button>
                    </div>
                    {success && 
                        <div className="container-msg-success">
                            <p>{success}</p>
                        </div>
                    }
                    {error && 
                        <div className="container-msg-error">
                            <p>{error}</p>
                        </div>
                    }
                </form>
                <div className="connecter-demande">Se connecter <Link to="/" className='link-custom'><span>ici</span></Link></div>
            </div>
        </body>
    )
}

export default Demande