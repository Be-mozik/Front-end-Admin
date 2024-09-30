import Sidebar from '../../components/sidebar/Sidebar'
import './Event.css'
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai"
import { useState,useEffect } from 'react';
import DropdwnUser from "../../components/dropdown/DropdownUser";
import { MdAccountCircle } from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import event from "../../api/eventApi";
import utilisateurApi from '../../api/utilisateurApi';

const Event = () => {
    const navigate = useNavigate();
    const [openDrop, setOpenDrop] = useState(false);
    const [nomevenement, setNomevenement] = useState('');
    const [dateheureevenement, setDateheureevenement] = useState('');
    const [lieuevenement, setLieuevenement] = useState('');
    const [descrievenement, setDescrievenement] = useState('');
    const [photo, setPhoto] = useState(null);
    const [dataTarif, setDataTarif] = useState([{ nombillet: "", tarifbillet: "", nombrebillet: "" }]);
    const [dataInfo, setDataInfo] = useState([{ numeroinfo: "", nominfo: "" }]);

    const handleClickDrop = () => {
        setOpenDrop(false);
    }

    const handleClickTarif = () => {
        setDataTarif([...dataTarif, { nombillet: "", tarifbillet: "", nombrebillet: "" }]);
    }

    const handleChangeTarif = (e, i) => {
        const { name, value } = e.target;
        const onchangeVal = [...dataTarif];
        onchangeVal[i][name] = value;
        setDataTarif(onchangeVal);
    }

    const handleDeleteTarif = (j) => {
        const deleteVal = [...dataTarif];
        deleteVal.splice(j, 1);
        setDataTarif(deleteVal.length === 0 ? [{ nombillet: "", tarifbillet: "", nombrebillet: "" }] : deleteVal);
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const tokenName = 'token';
                const decoded = await utilisateurApi.getProfile(tokenName);
                if (decoded) {
                    setUser(decoded);
                } else {
                    console.log('Token non trouvé');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserProfile();
    }, []);

    const [user, setUser] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('idutilisateur',user.idutilisateur);
        formData.append('nomevenement', nomevenement);
        formData.append('dateheureevenement', dateheureevenement);
        formData.append('lieuevenement', lieuevenement);
        formData.append('descrievenement', descrievenement);
        formData.append('photo', photo);
        formData.append('b', JSON.stringify(dataTarif));
        formData.append('i', JSON.stringify(dataInfo));

        try {
            const response = await event.creerEvent(formData);
            console.log('Événement créé avec succès:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la création de l\'événement:', error);
        }
    }

    return(
        <>
            <Sidebar></Sidebar>
            <div className="container-d">
                <div className="header-d">
                    <div className="titre-d">
                        Événement
                        <MdAccountCircle className="user" onClick={() => setOpenDrop(true)}/>
                        {openDrop && (
                            <DropdwnUser onCloseDrop={handleClickDrop}></DropdwnUser>
                        )}
                    </div>
                </div>
                <div className="modal-update-event">
                <div className="modal-update-header-event">
                    <h4>Ajouter un événement</h4>
                </div>
                <div className="modal-update-content">
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <input type="text" placeholder="Nom de l'événement" value={nomevenement} onChange={(e) => setNomevenement(e.target.value)} required/>
                            <input type="datetime-local" value={dateheureevenement} onChange={(e) => setDateheureevenement(e.target.value)} required/>
                            <input type="text" placeholder="Lieu de l'événement" value={lieuevenement} onChange={(e) => setLieuevenement(e.target.value)} required/>
                            {
                                dataTarif.map((val, i) => (
                                    <div className="billet" key={i}>
                                        <input type="text" name='nombillet' placeholder="Nom du billet" value={val.nombillet} onChange={(e) => handleChangeTarif(e, i)} />
                                        <input type="number" name='tarifbillet' placeholder="Tarif en ariary" value={val.tarifbillet} onChange={(e) => handleChangeTarif(e, i)} />
                                        <input type="number" name='nombrebillet' placeholder='Nombre de billet' value={val.nombrebillet} onChange={(e) => handleChangeTarif(e,i)} />
                                        <BsFillPlusSquareFill className="icon-plus" onClick={handleClickTarif} />
                                        <AiFillMinusSquare className='icon-moins' onClick={handleDeleteTarif} />
                                    </div>
                                ))
                            }
                            <hr className='separator'/>
                            {
                                dataInfo.map((val, j) => (
                                    <div className="info" key={j}>
                                        <input type="number" placeholder="Numéro de téléphone" name='numeroinfo' value={val.numeroinfo} onChange={(e) => handleChangeInfo(e, j)} />
                                        <input type="text" placeholder="Nom de la personne" name='nominfo' value={val.nominfo} onChange={(e) => handleChangeInfo(e, j)} />
                                        <BsFillPlusSquareFill className="icon-plus" onClick={handleClickInfo} />
                                        <AiFillMinusSquare className='icon-moins' onClick={handleDeleteInfo} />
                                    </div>
                                ))
                            }
                            <textarea placeholder='Description du show' value={descrievenement} onChange={(e)=>setDescrievenement(e.target.value)}></textarea>
                            <input type="file" className="upload-file" onChange={(e) => setPhoto(e.target.files[0])}/>
                        </div>
                        <div className="btn-btn-valider">
                            <button className='btn-valider-update'>
                                Valider
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default Event