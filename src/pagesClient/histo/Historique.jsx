import './Historique.css';
import Header from "../../componentsClient/nav_header/NavHeader";
import FooterClient from '../../componentsClient/footer/FooterClient';
import { useEffect, useState } from 'react';
import clientApi from '../../api/clientApi';
import { useNavigate } from 'react-router-dom';
import achatApi from '../../api/achatApi';
import moment from 'moment';

const Historique = () => {
    const [user, setUser] = useState(null);
    const [historique, setHistorique] = useState([]);
    const navigate = useNavigate();

    const handleDeco = async () => {
        try {
            await clientApi.deconnexionClient();
            navigate('/Connexion');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchClientProfile = async () => {
            try {
                const token = 'tokenClient';
                const decoded = await clientApi.getProfileClient(token);
                if (decoded) {
                    setUser(decoded);
                } else {
                    console.log('Token non trouvé');
                    await handleDeco();
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchClientProfile();
    }, []);

    useEffect(() => {
        const fetchHistorique = async () => {
            if (user) {
                try {
                    const histo = await achatApi.getHistoriqueByClient(user.idclient);
                    setHistorique(histo.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchHistorique();
    }, [user]);

    return (
        <>
            <div className="histo-container">
                <Header />
                <div className="content-histo">
                    <div className="titre-histo">
                        <h1>Mes achats</h1>
                        <p>L'historique de vos achats seront ici. <br />
                        PS : Le montant est converti en Ariary (MGA).</p>
                    </div>
                    <div className="tableau-histo">
                        <table className="table-histo">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Nom du billet</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th>Transaction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historique.length > 0 ? (
                                    historique.map((historique, index) => (
                                        <tr key={index}>
                                            <td>{historique.nomevenement}</td>
                                            <td>{historique.nombillet}</td>
                                            <td>{historique.nombre}</td>
                                            <td>{parseFloat(historique.montant).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</td>
                                            <td>{moment.tz(historique.datetransaction, 'Asia/Baghdad').format('DD-MM-YYYY à HH:mm')}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>
                                            Pas encore d'achats enregistrés.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FooterClient />
        </>
    );
}

export default Historique;
