import Sidebar from "../../components/sidebar/Sidebar";
import { MdAccountCircle } from "react-icons/md"
import './Dashboard.css'
import DropdwnUser from "../../components/dropdown/DropdownUser";
import {  useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { BsInfoSquareFill } from "react-icons/bs"
import BlocInfo from "../../components/bloc-info/BlocInfo";
import { Link } from "react-router-dom";
import eventApi from "../../api/eventApi";
import { format } from "date-fns";

const Dashboard  = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [events,setEvent] = useState([]);
    const [formattedEvents, setFormattedEvents] = useState([]);

    const fetchDataEvent = async () => {
        try {
            const events = await eventApi.getEvents();
            setEvent(events.data);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        fetchDataEvent();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const formattedData = events.map((e) => {
                if (e.dateheureevenement) {
                    const parts = e.dateheureevenement.split(' ');
                    if (parts.length === 2) {
                        const datePart = parts[0].split('-');
                        const timePart = parts[1];
                        const formattedDateString = `${datePart[2]}-${datePart[1]}-${datePart[0]}T${timePart}`;
                        const date = new Date(formattedDateString);
                        if (!isNaN(date.getTime())) {
                            return { ...e, formattedDate: format(date, 'dd-MM-yyyy') };
                        } else {
                            console.error('Date invalide:', formattedDateString);
                            return { ...e, formattedDate: 'Date invalide' };
                        }
                    } else {
                        console.error('Format de date inattendu:', e.dateheureevenement);
                        return { ...e, formattedDate: 'Format de date inattendu' };
                    }
                } else {
                    return { ...e, formattedDate: 'Date manquante' };
                }
            });
            setFormattedEvents(formattedData);
        }
    }, [events]);


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
                                { formattedEvents.map((e)=> (
                                    <tr key={e.idevenement}>
                                        <td>{e.idevenement}</td>
                                        <td>{e.nomevenement}</td>
                                        <td>{e.formattedDate}</td>
                                        <td>{e.lieuevenement}</td>
                                        <td>
                                        {(() => {
                                            const parts = e.formattedDate.split('-');
                                            const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                                            const datevalide = new Date(isoDate) < new Date(); 
                                            return !e.estvalide ? (
                                                <span style={{ color: '#FF0000' }}>Annuler</span>
                                            ) : 
                                                datevalide ? (
                                                <span style={{ color: '#FF0000' }}>Passé</span>
                                            ) : (
                                                <span style={{ color: '#2ACD30' }}>À venir</span>
                                            );
                                        })()}
                                        </td>
                                        <td>
                                            <span className="actions">
                                                <Link to={`/detailsdash/${e.idevenement}`}>
                                                    <BsInfoSquareFill className="info"/>
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

export default Dashboard