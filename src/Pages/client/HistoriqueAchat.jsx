import './HistoriqueAchat.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useState } from 'react'
import Table from '../../components/table/Table'

const HistoriqueAchat = () => {
    const [openDrop,setOpenDrop] = useState(false);
    
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
                        Liste des clients
                    </div>
                    <Table
                        childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Event et montant</th>
                            </tr>
                        }
                        childrenBody={
                            <>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>Event 1 - 25.000 Ar</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>Event 1 - 25.000 Ar</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>Event 1 - 25.000 Ar</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>Event 1 - 25.000 Ar</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>jean@gmail.com</td>
                                    <td>Event 1 - 25.000 Ar</td>
                                </tr>
                            </>
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default HistoriqueAchat