import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ProjectActionList from "../list/ProjectActionList";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import AddMembers from "./AddMembers";
import { Link } from "react-router-dom";
import { Bell, BellFill, Search, ThreeDots, EnvelopeFill, Person } from "react-bootstrap-icons";
import Data from "../utils/Data";

function ProjectActionView({actionList, project, user, typeAction, updatePage}){
    const [show, updateShow] = useState(false);
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    let isMember = false;
    {
        project.actionList.list.map((obj, index) => {
            if (obj.user.id_str == user.id_str){
                isMember = true;
            }
        })
    }

    function addElem(){
        updateVal("");
        updateError(ErrorEats.NO_ERROR);
        updateShow(true);
    }
    function handleClose(){
        updateShow(false);
    }
    function inviteMember(){   
    }
    //console.log(project.conv.id_str);
    let conversation = "/message/" + project.conv.id_str;
    if (!project.isFinish && isMember){
        return <div>
        <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                <h4>{"Membres"}</h4>
                <Link to={conversation} className="ms-2">
                    <Button variant="primary" className="pt-0 ps-2 pe-2">
                        <EnvelopeFill className="mt-0"></EnvelopeFill>
                    </Button>
                </Link>
            </div>
            <ProjectActionList 
                typeAction={typeAction} 
                updatePage={updatePage} 
                user={user} 
                project={project}
                actionList={actionList}>

            </ProjectActionList>
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Inviter des membres</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMembers project={project}></AddMembers>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    }else{
        return <div>
        <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                <h4>{"Membres"}</h4>
            </div>
            <ProjectActionList 
                typeAction={typeAction} 
                updatePage={updatePage} 
                user={user} 
                project={project}
                actionList={actionList}>

            </ProjectActionList>
        </div>
    </div>
    }
    
}
export default ProjectActionView;