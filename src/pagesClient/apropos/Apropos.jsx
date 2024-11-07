import './Apropos.css'
import NavHeader from '../../componentsClient/nav_header/NavHeader';
import FooterClient from '../../componentsClient/footer/FooterClient';
import Logo from '../../assets/Logo.png';

const Apropos = () => {
    return(
        <>
            <div className="apropos-container">
                <NavHeader/>
                <div className="apropos-content">
                <div className="logo">
                    <img src={Logo} alt="Logobar" />
                </div>
                    <div className="description">
                        <p>
                            Fondée en 2001 par M. Herinirina Samoëla RASOLOFONIAINA, Be Mozik est une société spécialisée dans la production musicale et l’organisation d’événements, se distinguant par la diversité de ses activités au sein du paysage audiovisuel malgache. <br />
                            L’entreprise propose une large gamme de services et de produits : <br />
                            <span class="list-item">• Organisation d’événements.</span> <br />
                            <span class="list-item">• Production et accompagnement d’artistes tels que Raboussa, Arison et Vonjy.</span> <br />
                            <span class="list-item">• Distribution et monétisation sur les plateformes de streaming.</span> <br />
                            <span class="list-item">• Location de studios d’enregistrement.</span> <br />
                            <span class="list-item">• Production de courts-métrages et de publicités.</span> <br />
                            <span class="list-item">• Vente d’albums et de produits dérivés.</span> <br />
                            Aujourd’hui, Be Mozik est un acteur clé dans l’Océan Indien, ainsi qu’en Europe, en Amérique et en Afrique, en collaborant avec diverses ONG présentes à Madagascar (UNICEF, USAID, PSI, CRS, etc.). L’entreprise emploie environ trente professionnels qualifiés dans divers domaines.
                        </p>
                    </div>
                </div>
            </div>
            <FooterClient/>
        </>
    );
}

export default Apropos