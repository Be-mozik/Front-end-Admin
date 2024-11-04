    import './DashboardDetail.css'
    import Sidebar from '../../components/sidebar/Sidebar'
    import { MdAccountCircle } from "react-icons/md"
    import { useEffect, useState } from 'react'
    import ModalDelete from '../../components/Modal/ModalDelete'
    import ModalUpdate from '../../components/Modal/ModalUpdate'
    import DropdwnUser from '../../components/dropdown/DropdownUser'
    import BlocInfo from '../../components/bloc-info/BlocInfo'
    import { BsFillPencilFill } from "react-icons/bs"
    import { TbCalendarCancel } from "react-icons/tb"
    import { format } from 'date-fns'
    import { useParams } from 'react-router-dom'
    import eventApi from '../../api/eventApi'
    import infoApi from '../../api/infoApi'
    import caApi from '../../api/caApi'

    const DashboardDetail = () => {
        const { id } = useParams();
        const [openDrop,setOpenDrop] = useState(false);
        const [event,setEvent] = useState(null);
        const [billet, setBillet] = useState([]);
        const [info, setInfo] = useState([]);
        const [stat,setStat] = useState({idevenement: 0, montant: 0,vente: 0});
        const [formattedDate, setFormattedDate] = useState('');
        const [formattedTime, setFormattedTime] = useState('');
        const [modalOpen,setModalOpen] = useState(false);
        const [modalUpdate,setModalUpdate] = useState(false);
        const [success,setSuccess] = useState(null);
        const [error,setError] = useState(null);

        const handleClickDrop = () =>{
            setOpenDrop(false);
        }

        const handleClick = () => {
            setModalOpen(false);
        }

        const handleClickUpdate = () =>{
            setModalUpdate(false);
        }

        const refreshData = async () => {
            try {
                const event = await eventApi.getEventById(id);
                const billet = await caApi.getStatByEventBillet(id);
                const info = await infoApi.getInfoByEvent(id);
                setEvent(event.data);
                setBillet(billet.data);
                setInfo(info.data);
            } catch (error) {
                console.log(error);
            }
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
                    const billet = await caApi.getStatByEventBillet(id);
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

        const handleCancelEvent =  async (id) => {
            try {
                const rep = await eventApi.annulerEvent(id);
                refreshData();
                console.log(rep.data.success);
                if(rep){
                    setModalOpen(false);
                    setSuccess(rep.data.success);
                }
            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    setError(error.response.data.message);
                }
            }
        }

        const handleSuccess = (message) => {
            setSuccess(message);
            setTimeout(() => {
                setSuccess(null);
            }, 5000);
        }

        useEffect(() => {
            const fetchStat = async () => {
                try {
                    const rep = await caApi.getStatByEvent(id);
                    setStat(rep.data);
                } catch (error) {
                    console.log(error);
                }
            };
            if (id) {
                fetchStat();
            }
        }, [id]);

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
                        <span>{stat?.vente ?? 0}</span>
                        <hr />
                    </BlocInfo>
                    <BlocInfo>
                        C.A total
                        <span>
                            {parseFloat(stat?.montant ?? 0).toLocaleString('fr-FR', { 
                                minimumFractionDigits: 1, 
                                maximumFractionDigits: 1 
                            }).replace(/ /g, '.')} Ar
                        </span>
                        <hr />
                    </BlocInfo>
                    </div>
                    { success &&
                        <div className='container-msg-success'>
                            <p>{success}</p>
                        </div>
                    }
                    { error && 
                        <div className='container-msg-error'>
                            <p>{error}</p>
                        </div>
                    }
                    <div className="detail-event">
                        <div className="titre-detail">
                            Details événement
                        </div>
                        <div className="container-event">
                            { event ? (
                                <>
                            <div className="bloc-event1">
                                <div className="place-img" key="lol">
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
                                            <span>{b.nombillet}:</span>
                                            <span>{parseFloat(b.tarifbillet).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {b.nomdevis} - {b.total_achats} vendu(s) / {b.nombrebillet}</span>
                                        </div>
                                        </>
                                    ))}
                                    <hr />
                                    { info.map((i) => (
                                        <>
                                        <div className="event-detail">
                                            <span>{i.nominfo}:</span>
                                            <span>{i.numeroinfo}</span>
                                        </div>
                                        </>
                                    ))}
                                    <hr />
                                    <div className="event-detail">
                                        <span>Statut: </span>
                                        {( event.estvalide ? (
                                            <span style={{ color: '#2ACD30' }}>En cours</span>
                                            ) : (
                                            <span style={{ color: '#FF0000' }}>Passé</span>
                                            )
                                        )}
                                    </div>
                                    <div className="event-detail">
                                        <span>Planifié par:</span> 
                                        <span>{event.idutilisateur}</span>
                                    </div>
                                    <div>
                                        <span className="actions-detail">
                                                <TbCalendarCancel className="deleted" onClick={() => setModalOpen(true)}/>
                                                {modalOpen && (
                                                    <ModalDelete onSubmit={() => handleCancelEvent(id)} onCancel={handleClick} onClose={handleClick} >
                                                        <p>Voulez-vous vraiment annuler cet événement ?</p>
                                                    </ModalDelete>
                                                )}
                                                <BsFillPencilFill className="modified" onClick={() => setModalUpdate(true)}/>
                                                {modalUpdate && (
                                                    <ModalUpdate onClose={handleClickUpdate} eventData={event} onSuccess={handleSuccess} refreshData={refreshData} />
                                                )}
                                        </span>
                                    </div>
                                </div>
                                </>
                            ): (
                                <p>Aucun événement n'a été trouvé</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default DashboardDetail