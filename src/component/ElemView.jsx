import SkillList from "../list/ElemList";
import AddElem from "./AddElem";
import React, { useState } from "react";
import Data from "../utils/Data";
import { Button, Modal } from "react-bootstrap";
import ElemList from "../list/ElemList";
import Constant from "../utils/Constant";

function ElemView({parent, list, keyword, canEdit, title, infoNothing, infoNothingEdit}){
    let [show, updateShow] = useState(false);
    function handleClose() {
        updateShow(false);
    }
    function addElem() {
        updateShow(true);
    }
    let content;
    if(list!=undefined&&list.size()!=0){
        content = <ElemList keyword={keyword} list={list} parent={parent} canEdit={canEdit}>
                
        </ElemList>
    }
    else {
        if(canEdit){
            content = <p className="mb-0 mt-1">{infoNothingEdit}</p>
        }
        else {
            content = <p className="mb-0 mt-1">{infoNothing}</p>
        }
    }
    return <div>
        <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-2">
            <div className="d-flex mt-1">
                <h4>{title}</h4>
                <Button onClick={addElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                </Button>
            </div>
            {content}
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une compétence</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddElem handleClose={handleClose} keyword={keyword} elem={parent}></AddElem>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default ElemView;