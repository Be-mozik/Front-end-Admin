import './AccueilClient.css'
import Header from "../../componentsClient/nav_header/NavHeader";
import Bloc from "../../componentsClient/bloc/Bloc";
import eventApi from '../../api/eventApi';
import { useEffect, useState } from 'react';
import FooterClient from "../../componentsClient/footer/FooterClient"

const AccueilClient = () => {
    const [event,setEvent] = useState([]);

    useEffect (() => {
        const fetchEvent = async () => {
            try {
                const rep = await eventApi.getEvents();
                console.log(rep.data);
                setEvent(rep.data);
            } catch (error) {
                console.log('Erreur lors de la récupération des events');
            }
        };
        fetchEvent();
    },[]);


    return(
        <>
        <div className="accueil-client-container">
            <Header />
            <div className="tongasoa">
                <h1>TONGASOA</h1>
                <p>
                    BE MOZIK Mandray sy Mandrindra feo ...
                    (Prise de son, Captation Live, Mixage, Mastering & E-Mastering)
                    IVD 36 Tsiazotafo - Antananarivo
                    Tel: 034 47 155 31 / Mail: bemozik@icloud.com
                </p>
            </div>
            <div className="events">
                <div className="title">
                    <h1>Événement</h1>
                    <p>Faites défiler horizontalement pour voir plus d'événements</p>
                </div>
                <div className="event">
                {event.length === 0 || event.every(ev => ev === null) ? (
                    <p>Pas d'événements à venir</p>
                ) : (
                    event.map((ev, index) => (
                        <Bloc 
                            key={index} 
                            imageSrc={`http://localhost:5000/uploads/${ev.imgevenement}`} 
                            alt={ev.imagevenement} 
                        />
                    ))
                )}
                </div>
            </div>
            <div className="artistes">
                <div className="title">
                    <h1>Artistes</h1>
                    <p>Faites défiler horizontalement pour voir plus d'artistes</p>
                </div>
                <div className="event">
                {event.length === 0 || event.every(ev => ev === null) ? (
                    <p>Pas d'événements à venir</p>
                ) : (
                    event.map((ev, index) => (
                        <Bloc 
                            key={index} 
                            imageSrc={`http://localhost:5000/uploads/${ev.imgevenement}`} 
                            alt={ev.imagevenement} 
                        />
                    ))
                )}
                </div>
            </div>
            <FooterClient></FooterClient>
        </div>
        </>
    )
}

export default AccueilClient