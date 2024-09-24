import './DashboardDetail.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle,MdOutlineFileDownload } from "react-icons/md"
import { useEffect, useState } from 'react'
import ModalDelete from '../../components/Modal/ModalDelete'
import ModalUpdate from '../../components/Modal/ModalUpdate'
import DropdwnUser from '../../components/dropdown/DropdownUser'
import BlocInfo from '../../components/bloc-info/BlocInfo'
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import eventApi from '../../api/eventApi'
import billetApi from '../../api/billetApi'
import infoApi from '../../api/infoApi'

const DashboardDetail = () => {
    const { id } = useParams();
    const [openDrop,setOpenDrop] = useState(false);
    const [event,setEvent] = useState(null);
    const [billet, setBillet] = useState([]);
    const [info, setInfo] = useState([]);
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

    const [modalOpen,setModalOpen] = useState(false);
    const [modalUpdate,setModalUpdate] = useState(false);

    const handleClick = () => {
        setModalOpen(false);
    }

    const handleClickUpdate = () =>{
        setModalUpdate(false);
    }

    useEffect(() => {
        const fetchDataEvent = async () => {
            try {
                const event = await eventApi.getEventById(id);
                setEvent(event.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataEvent();
    }, [id]);

    useEffect(() => {
        if (event && event.dateheureevenement) {
            const parts = event.dateheureevenement.split(' ');
            if (parts.length === 2) {
                const datePart = parts[0].split('-');
                const timePart = parts[1];
                const formattedDateString = `${datePart[2]}-${datePart[1]}-${datePart[0]}T${timePart}`;
                const date = new Date(formattedDateString);
                if (!isNaN(date.getTime())) {
                    setFormattedDate(format(date, 'dd-MM-yyyy'));
                    setFormattedTime(format(date, 'HH:mm'));
                } else {
                    console.error('Date invalide:', formattedDateString);
                }
            } else {
                console.error('Format de date inattendu:', event.dateheureevenement);
            }
        }
    }, [event]);
    

    useEffect(() => {
        const fecthDataBillet = async () => {
            try {
                const billet = await billetApi.getBilletByEvent(id);
                setBillet(billet.data);
            } catch (error) {
                console.log(error);
            }
        };
        fecthDataBillet();
    }, [id]);

    useEffect(() => {
        const fetchDataInfo = async () => {
            try {
                const info = await infoApi.getInfoByEvent(id);
                setInfo(info.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataInfo();
    },[id]);

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
                        Nombre de vente total
                        <span>67</span>
                        <hr />
                    </BlocInfo>
                    <BlocInfo>
                        C.A total
                        <span>150.000 Ar</span>
                        <hr />
                    </BlocInfo>
                    <BlocInfo>
                        Télécharger un Pdf
                        <span><MdOutlineFileDownload /></span>
                        <hr />
                    </BlocInfo>
                </div>
                <div className="detail-event">
                    <div className="titre-detail">
                        Details événement
                    </div>
                    <div className="container-event">
                        { event ? (
                            <>
                        <div className="bloc-event1">
                                        <div className="place-img">
                                            <img src={`http://localhost:5000/uploads/${event.imgevenement}`} alt={`${event.imagevenement}`}/>
                                        </div>
                                    </div>
                            <div className="bloc-event2">
                                <h4>{event.nomevenement}</h4>
                                <p className='descri'>{event.descrievenement}</p>
                                <div className="event-detail">
                                    <span>Date:</span>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="event-detail">
                                    <span>Heure:</span>
                                    <span>{formattedTime}</span>
                                </div>
                                <div className="event-detail">
                                    <span>Lieu:</span>
                                    <span>{event.lieuevenement}</span>
                                </div>
                                <hr />
                                { billet.map((b) => (
                                    <>
                                    <div className="event-detail">
                                        <span>{b.nombillet}</span>
                                        <span>{b.tarifbillet} Ar - 9 vendu(s)</span>
                                    </div>
                                    </>
                                ))}
                                <hr />
                                { info.map((i) => (
                                    <>
                                    <div className="event-detail">
                                        <span>{i.nominfo}</span>
                                        <span>{i.numeroinfo}</span>
                                    </div>
                                    </>
                                ))}
                                <hr />
                                <div className="event-detail">
                                    <span>Statut</span> 
                                    <span>A venir / Passé</span>
                                </div>
                                <div className="event-detail">
                                    <span>Plannifier par</span> 
                                    <span>{event.idutilisateur}</span>
                                </div>
                                <div className="actions-detail">
                                    <span className="actions-detail">
                                            <BsFillTrashFill className="deleted" onClick={() => setModalOpen(true)}/>
                                            {modalOpen && (
                                                <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                                    <p>Voulez-vous vraiment supprimer cet événement ?</p>
                                                </ModalDelete>
                                            )}
                                            <BsFillPencilFill className="modified" onClick={() => setModalUpdate(true)}/>
                                            {modalUpdate && (
                                                <ModalUpdate onSubmit={handleClickUpdate} onClose={handleClickUpdate}>
                                                </ModalUpdate>
                                            )}
                                    </span>
                                </div>
                            </div>
                            </>
                        ): (
                            <p>Aucun événement trouvé</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardDetail