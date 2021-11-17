import styles from './Modal.module.css';
import React from "react";
import { Modal} from "react-bootstrap";

const CustomModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>

            <div className={`${styles.modal} modal-header justify-content-between`}>
               <div> <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close" onClick={props.onClick}/></div>

               <div><h5 className="modal-title" id="exampleModalLabel">{props.title}</h5></div>

        </div>
            <Modal.Body style={{textAlign:'right'}}>{props.body}</Modal.Body>
            <div className="modal-footer justify-content-start">
                <button type="button" className="btn btn-success" onClick={props.onClick} data-bs-dismiss="modal">إغلاق</button>
            </div>

        </Modal>
    );
}

export default CustomModal
