import { useEffect, useState } from 'react';
import './ModalUpdate.css';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai";
import billetApi from '../../api/billetApi';
import infoApi from '../../api/infoApi';
import { useParams } from 'react-router-dom';
import eventApi from '../../api/eventApi';
import devisApi from '../../api/devisApi';

const ModalUpdate = ({onClose,eventData,refreshData,onSuccess}) => {
    const { id } = useParams();
    const [eventNom, setEventNom] = useState('');
    const [eventDateHeure,setEventDateHeure] = useState('');
    const [eventLieu, setEventLieu] = useState('');
    const [eventDescri,setEventDescri] = useState('');
    const [photo, setPhoto] = useState(null);
    const [devis, setDevis] = useState([]);
    const [dataTarif, setDataTarif] = useState([{ nombillet: "", tarifbillet: "",devis: "",nombrebillet: "" }]);
    const [dataInfo, setDataInfo] = useState([{ numeroinfo: "", nominfo: "" }]);

    useEffect(() => {
        if(eventData){
            setEventNom(eventData.nomevenement);
            setEventDateHeure(eventData.dateheureevenement);
            setEventLieu(eventData.lieuevenement);
            setEventDescri(eventData.descrievenement);
        }
    },[eventData]);

    useEffect(() => {
        const fecthDataBillet = async () => {
            try {
                const billet = await billetApi.getBilletByEvent(id);
                setDataTarif(billet.data.length > 0 ? billet.data : [{ nombillet: "", tarifbillet: "",devis: "",nombrebillet: "" }]); 
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
                setDataInfo(info.data.length > 0 ? info.data : [{ numeroinfo: "", nominfo: "" }]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataInfo();
    },[id]);

    const handleClickTarif = () => {
        setDataTarif([...dataTarif, { nombillet: "", tarifbillet: "", nombrebillet: "" }]);
    }

    const handleChangeTarif = (e, i) => {
        const { name, value } = e.target;
        const onchangeVal = [...dataTarif];
        onchangeVal[i][name] = value;
        setDataTarif(onchangeVal);
    }

    useEffect(() => {
        const fetchDevis = async () => {
            try {
                const ds = await devisApi.getDevis();
                setDevis(ds.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDevis();
    },[]);

    const handleDeleteTarif = (j) => {
        const deleteVal = [...dataTarif];
        deleteVal.splice(j, 1);
        setDataTarif(deleteVal.length === 0 ? [{ nombillet: "", tarifbillet: "",devis: "",nombrebillet: "" }] : deleteVal);
    }

    const handleClickInfo = () => {
        setDataInfo([...dataInfo, { numeroinfo: "", nominfo: "" }]);
    }

    const handleChangeInfo = (e, j) => {
        const { name, value } = e.target;
        const onchangeVal = [...dataInfo];
        onchangeVal[j][name] = value;
        setDataInfo(onchangeVal);
    }

    const handleDeleteInfo = (j) => {
        const deleteVal = [...dataInfo];
        deleteVal.splice(j, 1);
        setDataInfo(deleteVal.length === 0 ? [{ numeroinfo: "", nominfo: "" }] : deleteVal);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('idevenement', id);
        formData.append('nomevenement', eventNom);
        formData.append('dateheureevenement', eventDateHeure);
        formData.append('lieuevenement', eventLieu);
        formData.append('descrievenement', eventDescri);
        formData.append('photo', photo);
        formData.append('b', JSON.stringify(dataTarif));
        formData.append('i', JSON.stringify(dataInfo));
        try {
            const response = await eventApi.updateEvent(formData);
            console.log('Événement modifié avec succès:', response.data);
            onClose();
            refreshData();
            onSuccess && onSuccess(`L'événement ${eventNom} a été modifié avec succès !`);
        } catch (error) {
            console.error('Erreur lors de la modification de l\'événement:', error);
        }
    };

    return(
        <div className='modal-update-container' onClick={(e) =>{
            if(e.target.className==="modal-update-container"){
                onClose();
            }
            }}>
            <div className="modal-update">
                <div className="modal-update-header">
                    <h4>Modifier un événement</h4>
                    <p className="close-modal-update" onClick={() => onClose()}>&times;</p>
                </div>
                <div className="modal-update-content">
                    <div className="inputs">
                        <input type="text" value={eventNom} onChange={(e) => setEventNom(e.target.value)} placeholder="Nom de l'événement" required/>
                        <input type="datetime-local" value={eventDateHeure} onChange={(e) => setEventDateHeure(e.target.value)} placeholder="Date et Heure de l'événement" required/>
                        <input type="text" value={eventLieu} onChange={(e) => setEventLieu(e.target.value)} placeholder="Lieu de l'événement" required/>

                        { 
                            dataTarif.map((val, i) =>
                                <div className="billet" key={i}>
                                    <input type="text" name='nombillet' placeholder="Nom du billet" value={val.nombillet} onChange={(e) => handleChangeTarif(e, i)} />
                                    <input type="number" name='tarifbillet' placeholder="Tarif en ariary" value={val.tarifbillet} onChange={(e) => handleChangeTarif(e, i)} />
                                    <select name="devis" value={val.devis} onChange={(e) => handleChangeTarif(e, i)}>
                                            <option defaultValue="Devis">Devis</option>
                                            {
                                                devis.map(ds => (
                                                    <option value={ds.iddevis}>{ds.nomdevis}</option>
                                                ))
                                            }
                                    </select>
                                    <input type="number" name='nombrebillet' placeholder="Nombre de billets" value={val.nombrebillet} onChange={(e) => handleChangeTarif(e, i)} />
                                    <BsFillPlusSquareFill className="icon-plus" onClick={handleClickTarif} />
                                    <AiFillMinusSquare className='icon-moins' onClick={() => handleDeleteTarif(i)} />
                                </div>
                            )
                        }

                        <hr className='separator' />

                        { 
                            dataInfo.map((val, j) =>
                                <div className="info" key={j}>
                                    <input type="number" placeholder="Numéro de téléphone" name='numeroinfo' value={val.numeroinfo} onChange={(e) => handleChangeInfo(e, j)} />
                                    <input type="text" placeholder="Nom de la personne" name='nominfo' value={val.nominfo} onChange={(e) => handleChangeInfo(e, j)} />
                                    <BsFillPlusSquareFill className="icon-plus" onClick={handleClickInfo} />
                                    <AiFillMinusSquare className='icon-moins' onClick={() => handleDeleteInfo(j)} />
                                </div>
                            )
                        }
                        <textarea placeholder="Description du show" value={eventDescri} onChange={(e) => setEventDescri(e.target.value)} required></textarea>
                        <input type="file" className="upload-file" onChange={(e) => setPhoto(e.target.files[0])}/>
                    </div>
                    <div className="btn-btn-valider">
                        <button className='btn-valider-update' onClick={handleSubmit}>
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdate;
