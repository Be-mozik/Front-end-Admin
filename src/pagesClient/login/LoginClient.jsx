import './LoginClient.css'
import React, { useState } from "react";
import * as loginComponents from '../../componentsClient/componentLogin/Login'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import clientApi from '../../api/clientApi';

const LoginClient = () => {
    const [signIn, toggle] = useState(true);

    // Create account
    const [nomclient,setNomClient] = useState('');
    const [prenomclient,setPrenomClient] = useState('');
    const [mailclient,setMailClient] = useState('');
    const [mdp1,setMdp1] = useState('');
    const [mdp2, setMdp2] = useState('');

    // Connexion
    const [emailclient,setEmailClient] = useState('');
    const [passclient,setPassClient] = useState('');

    const [error , setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleGoogleLogin = () => {
        console.log("Google api");
    }

    const handleFacebookLogin = () => {
        console.log("FB Api");
    }

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {
                nomclient: nomclient,
                prenomclient: prenomclient,
                mailclient: mailclient,
                mdp1: mdp1,
                mdp2: mdp2
            };
            const client = await clientApi.addClientFormulaire(data);
            console.log(client);
            setSuccess('Votre compte a bien été créé, connectez-vous maintenant !');
            setTimeout(() => {
                setSuccess(null);
                toggle(true);
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 5000);
            } else {
                setError("Une erreur s'est produite. Veuillez réessayer.");
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        }
    };
    

    const handleLogInSubmit = async (event) =>{
        event.preventDefault();
        try {
            const data = {
                mail: emailclient,
                pass: passclient,
            };
            const client = await clientApi.loginClient(data);
            localStorage.setItem('tokenClient',client.token);
            window.location.href ='/Accueil';
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 5000);
            } else {
                setError("Une erreur s'est produite. Veuillez réessayer.");
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        }
    }

    return (
        <div className="login-client-container">
        <loginComponents.Container>
              <loginComponents.SignUpContainer signinIn={signIn}>
                  <loginComponents.Form onSubmit={handleSignUpSubmit}>
                      <loginComponents.Title>Créer un compte</loginComponents.Title>
                      <loginComponents.Input type='text' placeholder='Nom' value={nomclient} onChange={(e)=> setNomClient(e.target.value)} required />
                      <loginComponents.Input type='text' placeholder='Prénom' value={prenomclient} onChange={(e) => setPrenomClient(e.target.value)} required/>
                      <loginComponents.Input type='email' placeholder='Email' value={mailclient} onChange={(e) => setMailClient(e.target.value)} required/>
                      <loginComponents.Input type='password' placeholder='Mot de passe' value={mdp1} onChange={(e) => setMdp1(e.target.value)} required/>
                      <loginComponents.Input type='password' placeholder='Confirmer le mot de passe' value={mdp2} onChange={(e) => setMdp2(e.target.value)} required/>
                      <loginComponents.Button>Rejoindre</loginComponents.Button>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    backgroundColor: 'rgba(128, 128, 128, 1)',
                                }} />
                                <div className="separator">
                                    <div className="line"></div>
                                        <span className="text">ou</span>
                                    <div className="line"></div>
                                </div>
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    backgroundColor: 'rgba(128, 128, 128, 1)',
                                }} />
                            </div>
                <loginComponents.ApiContainer>
                    <loginComponents.GoogleButton onClick={handleGoogleLogin}  type="button">
                        <FontAwesomeIcon icon={faGoogle} />
                    </loginComponents.GoogleButton>
                    <loginComponents.FacebookButton onClick={handleFacebookLogin} type="button">
                        <FontAwesomeIcon icon={faFacebook} />
                    </loginComponents.FacebookButton>
                </loginComponents.ApiContainer>
                  </loginComponents.Form>
              </loginComponents.SignUpContainer>
              <loginComponents.SignInContainer signinIn={signIn}>
                   <loginComponents.Form onSubmit={handleLogInSubmit}>
                       <loginComponents.Title>Se connecter</loginComponents.Title>
                       <loginComponents.Input type='email' placeholder='Email' value={emailclient} onChange={(e) => setEmailClient(e.target.value)}  required/>
                       <loginComponents.Input type='password' placeholder='Mot de passe' value={passclient} onChange={(e) => setPassClient(e.target.value)} required />
                       <loginComponents.Button>Connexion</loginComponents.Button>
                       <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                            <div style={{
                                flex: 1,
                                height: '1px',
                                backgroundColor: 'rgba(128, 128, 128, 1)',
                            }} />
                            <div className="separator">
                                <div className="line"></div>
                                    <span className="text">ou</span>
                                <div className="line"></div>
                            </div>
                            <div style={{
                                flex: 1,
                                height: '1px',
                                backgroundColor: 'rgba(128, 128, 128, 1)',
                            }} />
                        </div>
                <loginComponents.ApiContainer>
                    <loginComponents.GoogleButton onClick={handleGoogleLogin}  type="button">
                        <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '5px' }} />
                    </loginComponents.GoogleButton>
                    <loginComponents.FacebookButton onClick={handleFacebookLogin}  type="button">
                        <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '5px' }} />
                    </loginComponents.FacebookButton>
                </loginComponents.ApiContainer>

                   </loginComponents.Form>
              </loginComponents.SignInContainer>

              <loginComponents.OverlayContainer signinIn={signIn}>
                  <loginComponents.Overlay signinIn={signIn}>

                  <loginComponents.LeftOverlayPanel signinIn={signIn}>
                    <loginComponents.Image src={Logo} alt="Logobar" />
                      <loginComponents.Paragraph>
                        Rejoignez-nous en créant votre compte !
                      </loginComponents.Paragraph>
                      <loginComponents.GhostButton onClick={() => toggle(true)}>
                        J'ai un compte Be Mozik.
                      </loginComponents.GhostButton>
                      </loginComponents.LeftOverlayPanel>

                      <loginComponents.RightOverlayPanel signinIn={signIn}>
                        <loginComponents.Image src={Logo} alt="Logobar" />
                        <loginComponents.Paragraph>
                        Bienvenue ! Entrez vos identifiants pour continuer. 
                        </loginComponents.Paragraph>
                            <loginComponents.GhostButton onClick={() => toggle(false)}>
                                Je n'ai pas de compte Be Mozik.
                            </loginComponents.GhostButton> 
                      </loginComponents.RightOverlayPanel>
  
                  </loginComponents.Overlay>
              </loginComponents.OverlayContainer>

          </loginComponents.Container>
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
        </div>
    )
}

export default LoginClient