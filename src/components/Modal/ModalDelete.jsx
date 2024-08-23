import './ModalDelete.css'

const ModalDelete = ({ onSubmit,onCancel,onClose,children }) => {
    return(
        <div className='modal-delete-container' onClick={(e) =>{
            if(e.target.className==="modal-delete-container"){
                onClose("midy sisiny");
            }
            }}>
            <div className="modal-delete">
                <div className="modal-delete-header">
                    <h4>Confirmation</h4>
                    <p className="close-modal-delete" onClick={() =>onClose("Midy")}>&times;</p>
                </div>
                <div className="modal-delete-content">
                    {children}
                </div>
                <div className="modal-delete-footer">
                    <p className="btn btn-confirm" onClick={() => onSubmit("Valider")}>Confirmer</p>
                    <p className="btn btn-refuser" onClick={() => onCancel("Refuser")}>Refuser</p>
                </div>
            </div>
        </div>
    )
} 

export default ModalDelete