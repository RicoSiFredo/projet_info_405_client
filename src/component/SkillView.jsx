import SkillList from "../object/list/SkillList";
import AddSkill from "./AddSkill";
import React, { useState } from "react";
import Data from "../utils/Data";
import { Button, Modal } from "react-bootstrap";
import { PlusCircleFill, PlusLg } from "react-bootstrap-icons";

function SkillView({user}){
    let [show, updateShow] = useState(false);
    let canEdit = Data.isMe(user);
    function handleClose() {
        updateShow(false);
    }
    function addSkill() {
        updateShow(true);
    }
    let content;
    if(user.skillList!=undefined&&user.skillList.size()!=0){
        content = <SkillList skillList={user.skillList} user={user} canEdit={canEdit}>
                
        </SkillList>
    }
    else {
        if(canEdit){
            content = <p className="mb-0 mt-1">Commencer à ajouter des compétences</p>
        }
        else {
            content = <p className="mb-0 mt-1">Aucune compétences</p>
        }
    }
    return <div>
        <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-2">
            <div className="d-flex mt-1">
                <h4>Compétences</h4>
                <Button onClick={addSkill} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src="plus.png"/>
                </Button>
            </div>
            {content}
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une compétence</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddSkill canEdit={canEdit} user={user}></AddSkill>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default SkillView;