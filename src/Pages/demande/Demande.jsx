import React from "react"
import Logo from '../../assets/Logo.png'
import './Demande.css'
import { MdEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { RiAccountBoxFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { ToastContainer, toast, Slide  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Demande = () => {
    const notify = () => toast.success("Demande envoyée, vérifiez votre email pour la suite.");

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
                        <input type="text" placeholder="Prénom" name="" id="prenom" />
                    </div>
                    <div className="input-demande">
                        <MdEmail />
                        <input type="email" placeholder="Email" name="" id="mail" />
                    </div>
                    <div className="input-demande">
                        <RiLockPasswordLine />
                        <input type="password" placeholder="Mot de passe" name="" id="mdp1" />
                    </div>
                    <div className="input-demande">
                        <RiLockPasswordLine />
                        <input type="password" placeholder="Confirmer votre mot de passe" name="" id="mdp2" />
                    </div>
                </div>
                <div className="submit-container-demande">
                    <div className="submit-demande" onClick={notify}>
                        Envoyer une demande
                    </div>
                    <ToastContainer
                            position="bottom-right"
                            autoClose= {20000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Slide}
                        />
                </div>
                <div className="connecter-demande">Se connecter <Link to="/" className='link-custom'><span>ici</span></Link></div>
            </div>
        </body>
    )
}

export default Demande