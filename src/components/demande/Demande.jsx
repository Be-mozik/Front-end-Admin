import React from "react";
import Logo from "../assets/Logo.png"
import './Demande.css'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { RiAccountBoxFill } from "react-icons/ri"

const Demande = () => {

    return(
        <div className="container">
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <RiAccountBoxFill />
                    <input type="text" placeholder="Nom et prénom" name="" id="" />
                </div>
                <div className="input">
                    <MdEmail />
                    <input type="email" placeholder="Email" name="" id="" />
                </div>
                <div className="input">
                    <RiLockPasswordLine />
                    <input type="password" placeholder="Mot de passe" name="" id="" />
                </div>
                <div className="input">
                    <RiLockPasswordLine />
                    <input type="password" placeholder="Confirmer votre mot de passe" name="" id="" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">
                    Envoyer une demande
                </div>
            </div>
            <div className="connecter">Se connecter <span>ici</span></div>
        </div>
    )
}

export default Demande