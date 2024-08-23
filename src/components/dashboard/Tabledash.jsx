import React, { useState } from "react"
import './Tabledash.css'
import { BsFillPencilFill, BsFillTrashFill,BsInfoSquareFill } from "react-icons/bs"
import ModalDelete from "../Modal/ModalDelete"
import ModalUpdate from "../Modal/ModalUpdate"

export const TableDash = () => {
    const [modalOpen,setModalOpen] = useState(false);
    const [modalUpdate,setModalUpdate] =useState(false);

    const [message,setMessage]=useState("");

    const handleClick = (value) => {
        setModalOpen(false);
        setMessage(value);
    }

    const handleClickUpdate = () =>{
        setModalUpdate(false);
    }

    return <div className="table-wrapper-d">
        <table className="table-dash">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Lieu</th>
                    <th>Statut</th>
                    <th>Actions</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Event 01</td>
                    <td>02/04/24</td>
                    <td>Maj</td>
                    <td>
                        <span className="label label-venir">A venir</span>
                    </td>
                    <td>
                        <span className="actions">
                            <BsFillTrashFill className="deleted" onClick={() => setModalOpen(true)}/>
                            {modalOpen && (
                                <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                    <p>Voulez-vous vraiment supprimer cet événement ?</p>
                                </ModalDelete>
                            )}
                            <BsFillPencilFill className="modified" onClick={() => setModalUpdate(true)}/>
                            {modalUpdate && (
                                <ModalUpdate onSubmit={handleClickUpdate} onClose={handleClickUpdate}>
                                </ModalUpdate>
                            )}
                        </span>
                    </td>
                    <td>
                        <span className="actions">
                            <BsInfoSquareFill className="info"/>
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Event 02</td>
                    <td>01/05/24</td>
                    <td>Maj</td>
                    <td>
                        <span className="label label-passe">Passé</span>
                    </td>
                    <td>
                        <span className="actions">
                            <BsFillTrashFill className="deleted" onClick={() => setModalOpen(true)}/>
                                {modalOpen && (
                                    <ModalDelete onSubmit={handleClick} onCancel={handleClick} onClose={handleClick}>
                                        <p>Voulez-vous vraiment supprimer cet événement ?</p>
                                    </ModalDelete>
                                )}
                            <BsFillPencilFill className="modified"/>
                        </span>
                    </td>
                    <td>
                        <span className="actions">
                            <BsInfoSquareFill className="info"/>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}