import React, { useState } from "react"
import './Login.css'
import Logo from '../assets/Logo.png'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"

const Login = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="inputs">
                <div className="input">
                    <MdEmail />
                    <input type="email" placeholder="Email" name="" id="" />
                </div>
                <div className="input">
                    <RiLockPasswordFill />
                    <input type="password" placeholder="Mot de passe" name="" id="" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Se connecter</div>
            </div>
            <div className="demande">Envoyer une demande <span>ici</span></div>
        </div>
    )
}

export default Login