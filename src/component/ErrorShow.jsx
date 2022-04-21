import { Button, Modal } from "react-bootstrap";
import React from "react";

function ErrorShow({title, info, close, handleClose=()=>{}, show=false}){
    return <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{info}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    {close}
                </Button>
            </Modal.Footer>
        </Modal>
}
export default ErrorShow;