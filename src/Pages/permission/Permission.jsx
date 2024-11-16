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
import moment from 'moment'

const Permission = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [users, setUsers] = useState([]);
    const [demandes, setDemande] = useState([]);

    const [modalOpenAccept,setModalOpenAccept] = useState(false);
    const [modalOpenDelete,setModalOpenDelete] = useState(false);
    const [modalOpenUser,setModalOpenUser] = useState(false);

    const [message,setMessage] = useState(null);
    const [error,setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    const handleClickDrop = () =>{
        setOpenDrop(false);
    }

    const fetchDataDemande = async () => {
        try {
            const demandes = await demandeApi.getDemandes();
            setDemande(demandes);
        } catch (error) {
            setError(error);
            console.log('Error: ', error);
        }
    };
    
    useEffect(() => {
        fetchDataDemande();
    }, []);

    const fetchDataUser = async () => {
        try {
            const utilisateurs = await utilisateurApi.getUtilisateurs();
            setUsers(utilisateurs.data);
        } catch (error) {
            setError(error);
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        fetchDataUser();
    }, []);

    const OpenAcceptClick = (id) => {
        setModalOpenAccept(`accept-${id}`);
    };

    const ApprouverDemande = async (id) => {
        try {
            const rep = await utilisateurApi.aproveDemande(id);
            console.log(rep.success);
            if(rep){
                setMessage(rep.success);
                fetchDataDemande();
                fetchDataUser();
                setModalOpenAccept(false);
            }
        } catch (error) {
            setError(`Erreur lors de l'affectation`);
            setModalOpenAccept(false);
        }
    }

    const CloseAcceptClick = () => {
        setModalOpenAccept(false);
    }

    const OpenDeleteClick = (id) => {
        setModalOpenDelete(`delete-${id}`);
    }

    const SupprimerDemande = async (id) => {
        try {
            const rep = await demandeApi.supprimerDemande(id);
            if (rep) {
                setMessage(rep.success);
                setModalOpenDelete(false);
                fetchDataDemande();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setMessage('Erreur lors de la suppression');
            setModalOpenDelete(false);
        }
    };

    const CloseDeleteClick = () => {
        setModalOpenDelete(false)
    }

    const OpenModalUser = (id) => {
        setModalOpenUser(`user-${id}`);
    }

    const SupprimerAccess = async (id) => {
        try {
            const rep = await utilisateurApi.supprimerAccess(id);
            if(rep){
                setMessage(rep.success);
                setModalOpenUser(false);
                fetchDataUser();
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setError('Erreur lors de la suppression');
            setModalOpenUser(false);
        }
    }

    const handleSuccess = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const CloseModalUser = () => {
        setModalOpenUser(false);
    }

    const sortTable = (array, config) => {
        const sortedArray = [...array];
        if (config.key) {
            sortedArray.sort((a, b) => {
                if (a[config.key] < b[config.key]) {
                    return config.direction === 'asc' ? -1 : 1;
                }
                if (a[config.key] > b[config.key]) {
                    return config.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedArray;
    };
    
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const sortedDemande = sortTable(demandes, sortConfig);
    const sortedUser = sortTable(users, sortConfig);

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
                { message &&
                    <div className='container-msg-success'>
                        <p>{message}</p>
                    </div>
                }
                { error && 
                    <div className='container-msg-error'>
                        <p>{error}</p>
                    </div>
                }
                <div className="table-d-permission">
                    <div className="titre-table">
                        Liste des demandes
                    </div>
                        <Table 
                            childrenHead={
                            <tr>
                                <th onClick={() => handleSort('iddemande')}>
                                    ID {sortConfig.key === 'iddemande' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('prenomdemande')}>
                                    Nom {sortConfig.key === 'prenomdemande' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('maildemande')}>
                                    Mail {sortConfig.key === 'maildemande' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('datedemande')}>
                                    Date demande {sortConfig.key === 'datedemande' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                                { sortedDemande.map((demande) => (
                                    <tr key={demande.iddemande}>
                                        <td>{demande.iddemande}</td>
                                        <td>{demande.prenomdemande}</td>
                                        <td>{demande.maildemande}</td>
                                        <td>{moment(demande.datedemande).format('DD-MM-YYYY')}</td>
                                        <td>
                                            <span className="actions">
                                            <BsPersonFillCheck className="accepted" onClick={() => OpenAcceptClick(demande.iddemande)}/>
                                                {modalOpenAccept === `accept-${demande.iddemande}` &&(
                                                    <ModalDelete onSubmit={() => ApprouverDemande(demande.iddemande)} onCancel={CloseAcceptClick} onClose={CloseAcceptClick} onSuccess={handleSuccess}>
                                                        <p>Êtes-vous sûr de vouloir accepter la demande de {demande.prenomdemande} ?</p>
                                                    </ModalDelete>
                                                )}
                                                <BsFillTrashFill className="deleted" onClick={() => OpenDeleteClick(demande.iddemande)}/>
                                                {modalOpenDelete === `delete-${demande.iddemande}` && (
                                                    <ModalDelete onSubmit={() => SupprimerDemande(demande.iddemande)} onCancel={CloseDeleteClick} onClose={CloseDeleteClick} onSuccess={handleSuccess}>
                                                        <p>Êtes-vous sûr de vouloir supprimer la demande de {demande.prenomdemande} ?</p>
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
                                <th>
                                    ID
                                </th>
                                <th onClick={() => handleSort('prenomutilisateur')}>
                                    Nom {sortConfig.key === 'prenomutilisateur' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('mailutilisateur')}>
                                    Mail {sortConfig.key === 'mailutilisateur' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th onClick={() => handleSort('depuisutilisateur')}>
                                    Depuis {sortConfig.key === 'depuisutilisateur' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                                { sortedUser.map((utilisateur) =>( 
                                    <tr key={utilisateur.idutilisateur}>
                                        <td>{utilisateur.idutilisateur}</td>
                                        <td>{utilisateur.prenomutilisateur}</td>
                                        <td>{utilisateur.mailutilisateur}</td>
                                        <td>{moment(utilisateur.depuisutilisateur).format('DD-MM-YYYY')}</td>
                                        <td>
                                            <span className="actions">
                                                <BsFillTrashFill className="deleted" onClick={() => OpenModalUser(utilisateur.idutilisateur)}/>
                                                {modalOpenUser === `user-${utilisateur.idutilisateur}` && (
                                                    <ModalDelete onSubmit={() => SupprimerAccess(utilisateur.idutilisateur)} onCancel={CloseModalUser} onClose={CloseModalUser}>
                                                        <p>Êtes-vous sûr de vouloir retirer l'accès de {utilisateur.prenomutilisateur} ?</p>
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