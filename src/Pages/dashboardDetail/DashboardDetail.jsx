import './DashboardDetail.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle,MdOutlineFileDownload } from "react-icons/md"
import { useState } from 'react';
import DropdwnUser from '../../components/dropdown/DropdownUser';
import BlocInfo from '../../components/bloc-info/BlocInfo';
import img from '../assets/lol.jpg'


const DashboardDetail = () => {
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
                        <div className="bloc-event1">
                            <div className="place-img">
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div className="bloc-event2">
                            <h4>Event</h4>
                            <p>Plongez dans l'univers envoûtant du Cabaret Étoile Nocturne, un lieu où glamour, mystère et élégance se mêlent pour une expérience inoubliable. Niché au cœur de la ville, ce cabaret vous propose un spectacle éblouissant où danseurs, chanteurs et artistes de cirque vous transportent dans une atmosphère féerique.</p>
                            <div className="event-detail">
                                <span>Date:</span>
                                <span>16 Août 2024</span>
                            </div>
                            <div className="event-detail">
                                <span>Heure:</span>
                                <span>21h</span>
                            </div>
                            <div className="event-detail">
                                <span>Lieu:</span>
                                <span>Les Roches Rouges Majunga</span>
                            </div>
                            <div className="event-detail">
                                <span>Billet 1</span>
                                <span>25.000 Ar - 9 vendu(s)</span>
                            </div>
                            <div className="event-detail">
                                <span>Billet 2</span>
                                <span>15.000 Ar - 24 vendu(s)</span>
                            </div>
                            <div className="event-detail">
                                <span>Statut</span> 
                                <span>A venir / Passé</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardDetail