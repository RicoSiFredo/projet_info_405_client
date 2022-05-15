import { Button, Modal, ModalBody } from "react-bootstrap";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import Data from "../utils/Data";
import React from "react"
import SimpleProfile from "../component/SimpleProfile";
import { ThreeDots } from "react-bootstrap-icons";
import { useState } from "react";
import PermEnum from "../enum/PermEnum";
import { Link } from "react-router-dom";
import ListEats from "../object/base/ListEats";

function ProjectActionElem({user, updatePage, typeAction, project, action}){
    const [listConv, updateConv] = useState(new ListEats("", undefined));
    let [show, updateShow] = useState(false);
    let [showRole, updateShowRole] = useState(false);
    function handleClose() {
        updateShow(false);
    }
    function openParam() {
        updateShow(true);
    }
    function openRole() {
        updateShowRole(true);
        handleClose();
    }
    function closeRole(){
        updateShowRole(false);
        openParam();
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
    let bonus;
    let button;
    if (ActionEnum.IN_PROJECT.got(typeAction) && !action.root){
        if (action.equals(project.action)){
            button = <Button className="m-1" onClick={exclure}>Quitter le projet</Button>

        }
        else if(project.havePermission(PermEnum.MANAGE_MEMBERS)){
            button = <Button className="m-1" onClick={exclure}>Exclure</Button>
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
    
    
    let test = "/message/";
    console.log(action.user);
    if (action.user.id_str != user.id_str){

        function showConv(){
            listConv.reset();
            listConv.makeRequest(
                'user/get/conversationWithFriend', 
                {
                    id: user.id_str,
                    id_friend: action.user.id_str 
                },
                function(error){
                },
                function(response){
                    test = test + listConv.list[0].convList.list[0].id_str;
                    console.log(test);
                    
                }
            )
        }
        
        bonus =
        <div className="align-self-center flex ">
			<Button onClick={openParam} variant="primary">
				<ThreeDots></ThreeDots>
			</Button>
            <Modal show={show} className="highest" onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Paramètres du membre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Selectionnez l'action
                    <div className="d-flex justify-content-center mt-2">
                        {button}
                        <Button className="m-1" variant="primary" onClick={handleClose}>
                            Noter
                        </Button>
                    
                        <Link to={test}>
                            <Button className="m-1" variant="primary" onClick={showConv}>Envoyer un message</Button>
                        </Link>

                        <Button className="m-1" variant="primary" onClick={openRole}>
                            Gerer le role
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Retour
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <Modal show={showRole} className="highest" onHide={closeRole} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Role du membre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <p>Input radio</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={closeRole}>
                            Retour
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
        
    }else{
        bonus =
        <div className="align-self-center flex ">
			<Button onClick={openParam} variant="primary">
				<ThreeDots></ThreeDots>
			</Button>
            <Modal show={show} className="highest" onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Paramètres du membre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     Selectionnez l'action
                     <div className="d-flex justify-content-center mt-2">
                     {button}
                     </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleClose}>
                        Retour
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
    
    return <SimpleProfile
        user={user} 
        action={action} 
        updatePage={updatePage} 
        isProject={false}
        contentBonus={bonus}>

    </SimpleProfile>
}
export default ProjectActionElem;