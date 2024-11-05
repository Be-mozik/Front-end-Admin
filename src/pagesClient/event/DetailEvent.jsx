import './DetailEvent.css'
import Header from "../../componentsClient/nav_header/NavHeader";
import { useEffect, useState } from 'react';
import eventApi from '../../api/eventApi';
import caApi from '../../api/caApi';
import infoApi from '../../api/infoApi';
import moment from 'moment'
import FooterClient from '../../componentsClient/footer/FooterClient';

const DetailEvent = () => {
    const [quantity, setQuantity] = useState(1);
    const [event, setEvent] = useState(null);
    const [billet,setBillet] = useState([]);
    const [info,setInfo] = useState([]);

    useEffect(() => {
        const fetchDataEvent = async () => {
            try {
                const event = await eventApi.getEventById('Event 29');
                console.log(event.data.dateheureevenement);
                setEvent(event.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataEvent();
    }, ['Event 29']);

    useEffect(() => {
        const fecthDataBillet = async () => {
            try {
                const billet = await caApi.getStatByEventBillet('Event 29');
                console.log(billet.data);
                setBillet(billet.data);
            } catch (error) {
                console.log(error);
            }
        };
        fecthDataBillet();
    }, ['Event 29']);

    useEffect(() => {
        const fetchDataInfo = async () => {
            try {
                const info = await infoApi.getInfoByEvent('Event 29');
                console.log(info.data);
                setInfo(info.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataInfo();
    },['Event 29']);

    return (
        <>
        <div className="event-page">
            <Header/>
            { event ? (
            <>
            <div className="event-image-section">
                <img 
                    src={`http://localhost:5000/uploads/${event.imgevenement}`} 
                    alt={event.imgevenement} 
                    className="event-image"
                />
            </div>
            <div className="event-details-section">
                <h2 className="event-title">{event.nomevenement}</h2>
                <p className="event-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </p>
                <div className="information-event">
                    <div>
                        Date: {moment(event.dateheureevenement, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')} à {moment(event.dateheureevenement, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')}
                    </div>
                    <div>Lieu: {event.lieuevenement}</div>
                </div>
                <div className="event-detail-info">
                    <label>Info-line</label>
                    {info.map((i, index) => (
                        <div key={index} className="info-item">
                            <span>{i.nominfo} :</span>
                            <span> {i.numeroinfo}</span>
                        </div>
                    ))}
                </div>

                <div className="event-detail-billet">
                    <label className='label-billet'>Billet(s)</label>
                    {billet.map((b, index) => (
                        <div key={index} className="billet-item">
                            <input
                                type="radio"
                                name="billet"
                                id={`billet-${index}`}
                                value={b.nombillet}
                            />
                            <label htmlFor={`billet-${index}`}>
                                <span>{b.nombillet} : </span>
                                <span>
                                    {parseFloat(b.tarifbillet).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {b.nomdevis}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="event-options">
                    <div className="option quantity">
                        <label>Choisissez le nombre de billets</label>
                        <div className='plus-quantity'>
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                </div>
                <button className="add-to-bag">Ajouter au panier</button>
            </div>
            </>
            ):(
                <p>Aucun événement n'a été trouvé</p>
            )}
        </div>
        <FooterClient></FooterClient>
        </>
    );
}

export default DetailEvent;