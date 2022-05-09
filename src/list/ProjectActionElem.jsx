import { Button, Modal } from "react-bootstrap";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import Data from "../utils/Data";
import React from "react"
import SimpleProfile from "../component/SimpleProfile";
import { ThreeDots } from "react-bootstrap-icons";
import { useState } from "react";
import PermEnum from "../enum/PermEnum";


function ProjectActionElem({user, updatePage, typeAction, project, action}){
    
    let [show, updateShow] = useState(false);
    function handleClose() {
        updateShow(false);
    }
    function openParam() {
        updateShow(true);
    }

    function exclure(){
        project.makeRequest(
            'project/del/user',
            {
                id_project: project.id_str,
                id_user: action.user.id_str,
                access_token: Data.accessToken()
            },
            function(err){
                console.log(err)
            },
            function(response){
                console.log(response)
            }
        )
    }

    function openProfil(){
        action.user.update = project.update;
        user.user.set(action.user);
        updatePage(PageEnum.Profil);
    }
    

    let text;
    if (ActionEnum.IN_PROJECT.got(typeAction)){
        text = <p>Role : {action.role.name}</p>
        
    }
    let button;
    if (ActionEnum.IN_PROJECT.got(typeAction) && !action.root){
        if (action.equals(project.action)){
            button = <div className="ms-3 align-self-center flex ">
                <Button onClick={exclure}>Quitter</Button>
            </div>
        }
        else if(project.havePermission(PermEnum.MANAGE_MEMBERS)){
            button = <div className="ms-3 align-self-center flex ">
                <Button onClick={exclure}>Exclure</Button>
            </div>
        }
    }
    else if(ActionEnum.USER_ASK_TO_PROJECT.got(typeAction)){
        function accepter(){
            project.makeRequest(
                'project/add/user',
                {
                    id_project: project.id_str,
                    id_user: action.user.id_str,
                    access_token: Data.accessToken(),
                    description: "",
                },
                function(err){
                },
                function(response){
                }
            )
        }
        function refuser(){
            project.makeRequest(
                'project/del/user',
                {
                    id_project: project.id_str,
                    id_user: action.user.id_str,
                    access_token: Data.accessToken()
                },
                function(err){
                },
                function(response){
                }
            )
        }
        bonus = <div>
            <p>{action.description}</p>
            <Button onClick={accepter}>Accepter</Button>
            <Button onClick={refuser}>Refuser</Button>
        </div>
    }
    let bonus;
    bonus =
        <div className="ms-3 align-self-center flex ">
			<Button onClick={openParam} className="p-absolute bottom-right ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
				<ThreeDots></ThreeDots>
			</Button>

            <Modal show={show} className="highest" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selectionnez l'action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={exclure}>
                        {button}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Noter
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Envoyer un message
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Annuler
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    return <SimpleProfile
        user={user} 
        action={action} 
        updatePage={updatePage} 
        isProject={false}
        contentBonus={bonus}>

    </SimpleProfile>
}
export default ProjectActionElem;