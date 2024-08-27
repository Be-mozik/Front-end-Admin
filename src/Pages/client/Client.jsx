import './Client.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useState } from 'react'
import Table from '../../components/table/Table'
import { FaBagShopping } from "react-icons/fa6"
import { Link } from 'react-router-dom'

const Client = () => {
    const [openDrop,setOpenDrop] = useState(false);
    
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
                                <th>Historique</th>
                            </tr>
                        }
                        childrenBody={
                            <>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>
                                        <span className='actions'>
                                            <Link to="/historique">
                                                <FaBagShopping className='bag'></FaBagShopping>
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>
                                        <span className='actions'>
                                            <Link to="/historique">
                                                <FaBagShopping className='bag'></FaBagShopping>
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>
                                        <span className='actions'>
                                            <Link to="/historique">
                                                <FaBagShopping className='bag'></FaBagShopping>
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>
                                        <span className='actions'>
                                            <Link to="/historique">
                                                <FaBagShopping className='bag'></FaBagShopping>
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>
                                        <span className='actions'>
                                            <Link to="/historique">
                                                <FaBagShopping className='bag'></FaBagShopping>
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                            </>
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default Client