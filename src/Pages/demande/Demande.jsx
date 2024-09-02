import React from "react"
import Logo from '../../assets/Logo.png'
import './Demande.css'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { RiAccountBoxFill } from "react-icons/ri"
import { Link } from "react-router-dom"

const Demande = () => {

    return(
        <body className="bg-other">
        <div className="container-demande">
            <div className="header-demande">
                <div className="logo-demande">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="inputs-demande">
                <div className="input-demande">
                    <RiAccountBoxFill />
                    <input type="text" placeholder="Nom et prénom" name="" id="" />
                </div>
                <div className="input-demande">
                    <MdEmail />
                    <input type="email" placeholder="Email" name="" id="" />
                </div>
                <div className="input-demande">
                    <RiLockPasswordLine />
                    <input type="password" placeholder="Mot de passe" name="" id="" />
                </div>
                <div className="input-demande">
                    <RiLockPasswordLine />
                    <input type="password" placeholder="Confirmer votre mot de passe" name="" id="" />
                </div>
            </div>
            <div className="submit-container-demande">
                <div className="submit-demande">
                    Envoyer une demande
                </div>
            </div>
            <div className="connecter-demande">Se connecter <Link to="/" className='link-custom'><span>ici</span></Link></div>
        </div>
        </body>
    )
}

export default Demande