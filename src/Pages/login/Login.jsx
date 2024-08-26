import React, { useState } from "react"
import './Login.css'
import Logo from '../../assets/Logo.png'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <body className="bg-other">
        <div className="container1-login">
            <div className="header-login">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
            </div>
            <div className="inputs-login">
                <div className="input-login">
                    <MdEmail />
                    <input type="email" placeholder="Email" name="" id="" />
                </div>
                <div className="input-login">
                    <RiLockPasswordFill />
                    <input type="password" placeholder="Mot de passe" name="" id="" />
                </div>
            </div>
            <div className="submit-container-login">
                <Link to ="/dashboard"><div className="submit-login">Se connecter</div></Link>
            </div>
            <div className="demande-login">Envoyer une demande <Link to="/demande"><span>ici</span></Link></div>
        </div>
        </body>
    )
}

export default Login