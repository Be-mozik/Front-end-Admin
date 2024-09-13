import './Permission.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useState } from 'react'
import Table from '../../components/table/Table'
import { BsFillTrashFill } from "react-icons/bs"
import ModalDelete from "../../components/Modal/ModalDelete"
import { BsPersonFillCheck } from "react-icons/bs"
import { useEffect } from 'react'
import utilisateurApi from '../../api/utilisateurApi'
import demandeApi from '../../api/demandeApi'

const Permission = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalOpen1,setModalOpen1] = useState(false);
    const [modalOpen2,setModalOpen2] = useState(false);
    const [users, setUsers] = useState([]);
    const [demandes, setDemande] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const utilisateurs = await utilisateurApi.getUtilisateurs();
                setUsers(utilisateurs.data);
            } catch (error) {
                console.log('Error: ',error);
            }
        };
        fetchData();
    },[]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const demandes = await demandeApi.getDemandes();
                setDemande(demandes);
            } catch (error) {
                console.log('Error: ',error);
            }
        }
        fetchData();
    },[]);


    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

    const handleClick = (value) => {
        setModalOpen(false);
    }

    const handleClick1 = (value) => {
        setModalOpen1(false);
    }

    const handleClick2 = (value) => {
        setModalOpen2(false);
    }

    return(
        <>
            <Sidebar></Sidebar>
            <div className="container-d">
                <div className="header-d">
                        <div className="titre-d">
                            Permission
                            <MdAccountCircle className="user" onClick={() => setOpenDrop(true)}/>
                            {openDrop && (
                                <DropdwnUser onCloseDrop={handleClickDrop}></DropdwnUser>
                            )}
                        </div>
                </div>
                <div className="table-d-permission">
                    <div className="titre-table">
                        Liste des demandes
                    </div>
                        <Table 
                            childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Mail</th>
                                <th>Date demande</th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                                { demandes.map((demandes) => (
                                    <tr>
                                        <td>{demandes.iddemande}</td>
                                        <td>{demandes.prenomdemande}</td>
                                        <td>{demandes.maildemande}</td>
                                        <td>{demandes.datedemande}</td>
                                        <td>
                                            <span className="actions">
                                            <BsPersonFillCheck className="accepted" onClick={() => setModalOpen(true)}/>
                                                {modalOpen && (
                                                    <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                                        <p>Voulez-vous vraiment accepter la demande de {demandes.prenomdemande} ?</p>
                                                    </ModalDelete>
                                                )}
                                                <BsFillTrashFill className="deleted" onClick={() => setModalOpen1(true)}/>
                                                {modalOpen1 && (
                                                    <ModalDelete onSubmit={handleClick1} onCancel={handleClick1} onClose={handleClick1}>
                                                        <p>Voulez-vous vraiment supprimer cette demande ?</p>
                                                    </ModalDelete>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                </>
                            }
                        />
                </div>

                <div className="table-d-permission">
                    <div className="titre-table">
                        Liste des admins
                    </div>
                        <Table 
                            childrenHead={
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Mail</th>
                                <th>Depuis</th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                                { users.map((utilisateurs) =>( 
                                    <tr>
                                        <td>{utilisateurs.idutilisateur}</td>
                                        <td>{utilisateurs.prenomutilisateur}</td>
                                        <td>{utilisateurs.mailutilisateur}</td>
                                        <td>{utilisateurs.depuisutilisateur}</td>
                                        <td>
                                            <span className="actions">
                                                <BsFillTrashFill className="deleted" onClick={() => setModalOpen2(true)}/>
                                                {modalOpen2 && (
                                                    <ModalDelete onSubmit={handleClick2} onCancel={handleClick2} onClose={handleClick2}>
                                                        <p>Voulez-vous vraiment supprimer l'accés de {utilisateurs.prenomutilisateur} ?</p>
                                                    </ModalDelete>
                                                )}
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

export default Permission