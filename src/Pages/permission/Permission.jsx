import './Permission.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { MdAccountCircle } from "react-icons/md"
import DropdwnUser from '../../components/dropdown/DropdownUser'
import { useState } from 'react'
import Table from '../../components/table/Table'
import { BsFillTrashFill } from "react-icons/bs"
import ModalDelete from "../../components/Modal/ModalDelete"
import { BsPersonFillCheck } from "react-icons/bs"

const Permission = () => {
    const [openDrop,setOpenDrop] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalOpen1,setModalOpen1] = useState(false);
    const [modalOpen2,setModalOpen2] = useState(false);


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
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                               <tr>
                                <td>1</td>
                                <td>Jean</td>
                                <td>02/04/24</td>
                                <td>
                                    <span className="actions">
                                    <BsPersonFillCheck className="accepted" onClick={() => setModalOpen(true)}/>
                                        {modalOpen && (
                                            <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                                <p>Voulez-vous vraiment accepter cette demande ?</p>
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

                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>02/04/24</td>
                                    <td>
                                        <span className="actions">
                                            <BsPersonFillCheck className="accepted" onClick={() => setModalOpen(true)}/>
                                                {modalOpen && (
                                                    <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                                        <p>Voulez-vous vraiment accepter cette demande ?</p>
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
                                <th>Depuis</th>
                                <th>Actions</th>
                            </tr>
                            }
                            childrenBody={
                                <>
                               <tr>
                                <td>1</td>
                                <td>Jean</td>
                                <td>02/04/24</td>
                                <td>
                                    <span className="actions">
                                        <BsFillTrashFill className="deleted" onClick={() => setModalOpen2(true)}/>
                                        {modalOpen2 && (
                                            <ModalDelete onSubmit={handleClick2} onCancel={handleClick2} onClose={handleClick2}>
                                                <p>Voulez-vous vraiment supprimer cette demande ?</p>
                                            </ModalDelete>
                                        )}
                                    </span>
                                </td>
                            </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Jean</td>
                                    <td>02/04/24</td>
                                    <td>
                                    <span className="actions">
                                        <BsFillTrashFill className="deleted" onClick={() => setModalOpen2(true)}/>
                                        {modalOpen2 && (
                                            <ModalDelete onSubmit={handleClick2} onCancel={handleClick2} onClose={handleClick2}>
                                                <p>Voulez-vous vraiment supprimer cet accès ?</p>
                                            </ModalDelete>
                                        )}
                                    </span>
                                    </td>
                                </tr>
                                </>
                            }
                        />
                </div>
            </div>
        </>
    )
}

export default Permission