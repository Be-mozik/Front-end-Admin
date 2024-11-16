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
    const [sortConfig, setSortConfig] = useState({ key: 'idclient', direction: 'asc' });


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
    
    const sortedClient = sortTable(client, sortConfig);


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
                                <th>
                                    ID 
                                </th>
                                <th onClick={() => handleSort('nomclient')}>
                                    Nom {sortConfig.key === 'nomclient' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('mailclient')}>
                                    Email {sortConfig.key === 'mailclient' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('dateclient')}>
                                    Depuis {sortConfig.key === 'dateclient' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Historique</th>
                            </tr>
                        }
                        childrenBody={
                            <>
                                { sortedClient.map((c) =>(
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