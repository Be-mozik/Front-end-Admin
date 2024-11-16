import './HistoriqueAchat.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { useParams } from 'react-router-dom'
import achatApi from '../../api/achatApi'
import moment from 'moment-timezone';
import clientApi from '../../api/clientApi'

const HistoriqueAchat = () => {
    const { id } = useParams();
    const [openDrop,setOpenDrop] = useState(false);
    const [achat, setAchat] =useState([]);
    const [client,setClient] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'datetransaction', direction: 'asc' });


    useEffect(() => {
        const fetchDataClient = async () => {
            try {
                const clt = await clientApi.getClientById(id);
                setClient(clt.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    useEffect(() => {
        const fetchHistorique = async () => {
            if (id) {
                try {
                    const histo = await achatApi.getHistoriqueByClient(id);
                    setAchat(histo.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchHistorique();
    }, [id]);

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

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
    
    const sortHistorique = sortTable(achat, sortConfig);


    return(
        <>
            <Sidebar></Sidebar>
            <div className="container-d">
                <div className="header-d">
                    <div className="titre-d">
                        Client
                        <MdAccountCircle className="user" onClick={() => setOpenDrop(true)}/>
                            {openDrop && (
                                <DropdwnUser onCloseDrop={handleClickDrop}></DropdwnUser>
                            )}
                    </div>
                </div>
                <div className="table-d-client">
                    <div className="titre-table">
                        Liste des achats de {client ? `${client.nomclient} ${client.prenomclient}` : "chargement..."}
                    </div>
                    <Table
                        childrenHead={
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
                        }
                        childrenBody={
                            <>
                              { sortHistorique.map((a) => (
                                <tr key={a.tokenachat}>
                                    <td>{a.nomevenement}</td>
                                    <td>{a.nombillet}</td>
                                    <td>{a.nombre}</td>
                                    <td>{parseFloat(a.montant).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</td>
                                    <td>{moment.tz(a.datetransaction, 'Asia/Baghdad').format('DD-MM-YYYY à HH:mm')}</td>
                                </tr>
                              ))}  
                            </>
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default HistoriqueAchat