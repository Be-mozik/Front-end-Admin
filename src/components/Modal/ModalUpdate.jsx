import { useState } from 'react';
import './ModalUpdate.css';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai"

const ModalUpdate = ({onSubmit,onClose}) => {
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
                        <button className='btn-valider-update' onClick={() => onSubmit()}>
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalUpdate;
