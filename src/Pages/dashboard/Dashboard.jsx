import Sidebar from "../../components/sidebar/Sidebar";
import { MdAccountCircle } from "react-icons/md"
import './Dashboard.css'
import DropdwnUser from "../../components/dropdown/DropdownUser";
import {  useState } from "react";
import Table from "../../components/table/Table";
import { BsInfoSquareFill } from "react-icons/bs"
import BlocInfo from "../../components/bloc-info/BlocInfo";
import { Link } from "react-router-dom";

const Dashboard  = () => {
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
                        Dashboard
                        <MdAccountCircle className="user" onClick={() => setOpenDrop(true)}/>
                        {openDrop && (
                            <DropdwnUser onCloseDrop={handleClickDrop}></DropdwnUser>
                        )}
                    </div>
                </div>
                <div className="info-ds">
                    <BlocInfo>
                        Nombre de client(s)
                        <span>624</span>
                        <hr />
                        + 2.5% depuis le mois dernier
                    </BlocInfo>
                    <BlocInfo>
                        C.A Total
                        <span>175.500 Ar</span>
                        <hr />
                        + 15% depuis le mois dernier
                    </BlocInfo>
                    <BlocInfo>
                        Nombre d'events
                        <span>47</span>
                        <hr />
                        + 0.5% depuis le mois dernier
                    </BlocInfo>
                    <BlocInfo>
                        Vente de billet total
                        <span>512</span>
                        <hr />
                        + 1% depuis le mois dernier
                    </BlocInfo>
                </div>
                <div className="graph-d">
                    <div className="graph-ds">
                        <div className="chart">
                            bloc de chart
                        </div>
                        <div className="titre-chart">
                            Graph 1
                            <select name="" id="">
                                <option value="">2024</option>
                            </select>
                        </div>
                    </div>
                    <div className="graph-ds">
                        <div className="chart">
                            bloc de chart 2
                        </div>
                        <div className="titre-chart">
                            Graph 1
                        </div> 
                    </div>
                </div>
                <div className="table-d">
                    <div className="titre-table">
                        Liste des événements
                    </div>
                        <Table 
                            childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Event</th>
                                <th>Date</th>
                                <th>Lieu</th>
                                <th>Statut</th>
                                <th>Details</th>
                            </tr>
                            }
                            childrenBody={
                        <>
                               <tr>
                                <td>1</td>
                                <td>Event 01</td>
                                <td>02/04/24</td>
                                <td>Maj</td>
                                <td>
                                    <span className="label label-venir">A venir</span>
                                </td>
                                <td>
                                    <span className="actions">
                                        <Link to="/detailsdash">
                                            <BsInfoSquareFill className="info"/>
                                        </Link>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Event 02</td>
                                <td>01/05/24</td>
                                <td>Maj</td>
                                <td>
                                    <span className="label label-passe">Passé</span>
                                </td>
                                <td>
                                    <span className="actions">
                                        <Link to="/detailsdash">
                                            <BsInfoSquareFill className="info"/>
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

export default Dashboard