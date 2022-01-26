import styles from './ModalQuestionFrom.module.css';
import React from "react";
import {Modal} from "react-bootstrap";

const ModalQuestionForm = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>

            <div className={`modal-header p-2`}>
                <div>
                    <button type="button" className="btn-close justify-content-start" data-bs-dismiss="modal"
                            aria-label="Close" onClick={props.onClick}/>
                </div>

                <div><h5 className="modal-title" style={{textAlign:'center'}} id="exampleModalLabel">{props.title}</h5></div>

            </div>
            <Modal.Body style={{textAlign: 'right'}}>
                {props.children}
            </Modal.Body>

        </Modal>
    );
}

export default ModalQuestionForm
