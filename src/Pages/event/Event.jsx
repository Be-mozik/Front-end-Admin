import Sidebar from '../../components/sidebar/Sidebar'
import './Event.css'
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai"
import { useState } from 'react';
import DropdwnUser from "../../components/dropdown/DropdownUser";
import { MdAccountCircle } from "react-icons/md"

const Event = () => {
    const [openDrop,setOpenDrop] = useState(false);

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }
    const [dataTarif,setDataTarif] =useState([{billet:"",prix:""}])

    const handleClickTarif =() => {
        setDataTarif([...dataTarif,{billet:"",prix:""}])
    }

    const handleChangeTarif = (e,i)=>{
        const {name,value}=e.target
        const onchangeVal=[...dataTarif]
        onchangeVal[i][name]=value
        setDataTarif(onchangeVal)
    }

    const handleDeleteTarif=(j)=>{
        const deleteVal =[...dataTarif]
        deleteVal.splice(j,1);
        setDataTarif(deleteVal);
    }

    //Info
    const [dataInfo,setDataInfo]=useState([{num:"",nom:""}])

    const handleClickInfo =() => {
        setDataInfo([...dataInfo,{num:"",nom:""}])
    }

    const handleChangeInfo = (e,j)=>{
        const {name,value}=e.target
        const onchangeVal=[...dataInfo]
        onchangeVal[j][name]=value
        setDataInfo(onchangeVal)
    }

    const handleDeleteInfo=(j)=>{
        const deleteVal =[...dataInfo]
        deleteVal.splice(j,1);
        setDataInfo(deleteVal);
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
                    <div className="inputs">
                        <input type="text" placeholder="Nom de l'événement" />
                        <input type="datetime-local" />
                        <input type="text" placeholder="Lieu de l'événement" />
                        {
                            dataTarif.map((val,i) =>
                                <div className="billet">
                                    <input type="text" name='billet' placeholder="Nom du billet" value={val.billet} onChange={(e)=>handleChangeTarif(e,i)}/>
                                    <input type="number" name='prix' placeholder="Tarif en ariary" value={val.prix} onChange={(e)=>handleChangeTarif(e,i)}/>
                                    <BsFillPlusSquareFill className="icon-plus" onClick={handleClickTarif}/>
                                    <AiFillMinusSquare className='icon-moins' onClick={handleDeleteTarif}/>
                                </div>
                            )
                        }
                            <hr className='separator'/>
                        {
                            dataInfo.map((val,j)=>
                                <div className="info">
                                    <input type="number" placeholder="Numéro de téléphone" name='num' value={val.num} onChange={(e)=>handleChangeInfo(e,j)}/>
                                    <input type="text" placeholder="Nom de la personne" name='nom' value={val.nom} onChange={(e)=>handleChangeInfo(e,j)}/>
                                    <BsFillPlusSquareFill className="icon-plus" onClick={handleClickInfo}/>
                                    <AiFillMinusSquare className='icon-moins' onClick={handleDeleteInfo}/>
                                </div>
                            )
                        }
                        <textarea placeholder='Description du show'></textarea>
                        <input type="file" className="upload-file" />
                    </div>
                    <div className="btn-btn-valider">
                        <button className='btn-valider-update'>
                            Valider
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Event