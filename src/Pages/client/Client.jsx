import './Client.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { FaBagShopping } from "react-icons/fa6"
import { Link } from 'react-router-dom'
import clientApi from '../../api/clientApi'
import moment from 'moment'

const Client = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [client, setClient] = useState([]);

    const fetchDataClient = async () => {
        try {
            const clients = await clientApi.getClient();
            setClient(clients.data);
        } catch (error) {
            console.log('Eroor: ',error);
        }
    }
    
    useEffect(() => {
        fetchDataClient();
    }, []);

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

    return (
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
                        Liste des clients
                    </div>
                    <Table
                        childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Depuis</th>
                                <th>Historique</th>
                            </tr>
                        }
                        childrenBody={
                            <>
                                { client.map((c) =>(
                                    <tr key={c.idclient}>
                                        <td>{c.idclient}</td>
                                        <td>{c.nomclient} {c.prenomclient}</td>
                                        <td>{c.mailclient}</td>
                                        <td>{moment(c.dateclient).format('DD-MM-YYYY')}</td>
                                        <td>
                                            <span className='actions'>
                                                <Link to={`/achat/${c.idclient}`}>
                                                    <FaBagShopping className='bag'></FaBagShopping>
                                                </Link>
                                            </span>
                                        </td>
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

export default Client