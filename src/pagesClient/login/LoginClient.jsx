import './LoginClient.css'
import React, { useState } from "react";
import * as loginComponents from '../../componentsClient/componentLogin/Login'
import Logo from '../../assets/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const LoginClient = () => {
    const [signIn, toggle] = useState(true);

    const handleGoogleLogin = () => {
        console.log("Google api");
    }

    const handleFacebookLogin = () => {
        console.log("FB Api");
    }

    return (
        <div className="login-client-container">
        <loginComponents.Container>
              <loginComponents.SignUpContainer signinIn={signIn}>
                  <loginComponents.Form>
                      <loginComponents.Title>Créer un compte</loginComponents.Title>
                      <loginComponents.Input type='text' placeholder='Nom' />
                      <loginComponents.Input type='text' placeholder='Prénom' />
                      <loginComponents.Input type='email' placeholder='Email' />
                      <loginComponents.Input type='password' placeholder='Mot de passe' />
                      <loginComponents.Input type='password' placeholder='Confirmer le mot de passe' />
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
                   <loginComponents.Form>
                       <loginComponents.Title>Se connecter</loginComponents.Title>
                       <loginComponents.Input type='email' placeholder='Email' />
                       <loginComponents.Input type='password' placeholder='Mot de passe' />
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
        </div>
    )
}

export default LoginClient