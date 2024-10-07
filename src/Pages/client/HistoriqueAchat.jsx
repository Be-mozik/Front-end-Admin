import './HistoriqueAchat.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useEffect, useState,useCallback } from 'react'
import Table from '../../components/table/Table'
import { useParams } from 'react-router-dom'
import achatApi from '../../api/achatApi'
import moment from 'moment'
import clientApi from '../../api/clientApi'

const HistoriqueAchat = () => {
    const { id } = useParams();
    const [openDrop,setOpenDrop] = useState(false);
    const [achat, setAchat] =useState([]);
    const [client,setClient] = useState(null);

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

    const fetchDataAchat = useCallback(async () => {
        try {
            const achat = await achatApi.getHistoriqueByClient(id);
            setAchat(achat.data);
        } catch (error) {
            console.log('Erreur: ',error);
        }
    },[id]);

    useEffect(() => {
        fetchDataAchat();
    },[fetchDataAchat]);

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }


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
                                <th>Event</th>
                                <th>Billet</th>
                                <th>Nombre</th>
                                <th>Montant</th>
                                <th>Transaction</th>
                            </tr>
                        }
                        childrenBody={
                            <>
                              { achat.map((a) => (
                                <tr key={a.tokenachat}>
                                    <td>{a.idevenement}</td>
                                    <td>{a.idbillet}</td>
                                    <td>{a.nombre}</td>
                                    <td>{parseFloat(a.montant).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar</td>
                                    <td>{moment(a.datetransaction).format('DD-MM-YYYY à HH:MM')}</td>
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