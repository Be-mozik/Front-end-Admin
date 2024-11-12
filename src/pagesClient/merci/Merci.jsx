import './Merci.css'
import Header from "../../componentsClient/nav_header/NavHeader"
import Footer from "../../componentsClient/footer/FooterClient"
import { Link as LinkSimple } from 'react-router-dom';

const Merci = () => {
    return(
        <>
            <div className="merci-container">
                <Header/>
                <div className="merci-content">
                    <h1>MISAOTRA TOMPOKO</h1>
                    <p>
                        Merci pour votre achat ! Nous vous souhaitons une ambiance des plus festives !
                    </p>
                    <LinkSimple
                        to="/Accueil"   
                    >
                        <button className="accueil" >Accueil</button>                
                    </LinkSimple>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Merci;