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
    const [sortConfig, setSortConfig] = useState({ key: 'datetransaction', direction: 'asc' });

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

    const sortTable = (array, config) => {
        const sortedArray = [...array];
        if (config.key) {
            sortedArray.sort((a, b) => {
                if (a[config.key] < b[config.key]) {
                    return config.direction === 'asc' ? -1 : 1;
                }
                if (a[config.key] > b[config.key]) {
                    return config.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedArray;
    };
    
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const sortHistorique = sortTable(historique, sortConfig); // Trier l'historique avec la configuration actuelle

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
                                    <th onClick={() => handleSort('nomevenement')}>
                                        Event {sortConfig.key === 'nomevenement' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => handleSort('nombillet')}>
                                        Billet {sortConfig.key === 'nombillet' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => handleSort('nombre')}>
                                        Nombre {sortConfig.key === 'nombre' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th>
                                        Montant
                                    </th>
                                    <th onClick={() => handleSort('datetransaction')}>
                                        Transaction {sortConfig.key === 'datetransaction' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortHistorique.length > 0 ? (
                                    sortHistorique.map((historique, index) => (  // Utiliser sortHistorique ici
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
