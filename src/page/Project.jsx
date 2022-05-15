import { useEffect, useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import Field from "../component/Field";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import PermEnum from "../enum/PermEnum";
import ProjectActionList from "../list/ProjectActionList";
import Data from "../utils/Data";
import React from "react"
import ProfilView from "../component/ProfilView";
import ElemView from "../component/ElemView";
import ProjectActionView from "../component/ProjectActionView";
import ManageRole from "./ManageRole";
import { useParams } from "react-router-dom";
import Project from "../object/Project";
import Eats from "../object/base/Eats";
import NotifList from "../list/NotifList";
import ActualiteView from "../component/ActualiteView";
import { GearFill } from "react-bootstrap-icons";

function ProjectFrame({rootUser, updatePage}){
    const {id} = useParams();
    const [project, updateProject] = useState(new Project());
    project.id_str = id;
    function update(){
        updateProject(Eats.fakeUpdate(project));
        // fait croire à un changement
    }
    project.update = update;

    const [edit, updateEdit] = useState(false);
    const [comment, updateComment] = useState("");
    useEffect(function(){
        project.getBase();
        project.getAllAction();
        project.getAllTecno();
        project.getAllPermission();
        project.getHaveActuList();
    }, []);
    let canEdit = false;
    let [show, updateShow] = useState(false);
    let [end, updateEnd] = useState(false);
    let [param, updateParam] = useState(false);

    function handleClose() {
        updateShow(false);
    }
    function delProject() {
        endClose();
        updateShow(true);
    }
    function endClose() {
        updateEnd(false);
    }
    function endProject() {
        handleClose();
        updateEnd(true);
    }
    function showProjectParam(){
        updateParam(true);
        endClose();
        handleClose();
    }
    function unshowProjectParam(){
        updateParam(false);
    }
    function requestDelete() {
        project.makeRequest(
            'project/del',
            {
                access_token: Data.accessToken(),
                id_project: project.id_str
            },
            function(error){
            },
            function(response){
                updatePage(PageEnum.Profil);
            }
        )
        handleClose();
    }
    function requestFinish() {
        project.finished = true;
        endClose();
    }

    let joinBlock;
    if(!project.isIn()){
        function join(){
            updateEdit(!edit);
        }
        function joinSend(){
            project.makeRequest(
                'user/add/project',
                {
                    access_token: Data.accessToken(),
                    id_project: project.id_str,
                    description: comment
                },
                function(error){
                },
                function(response){
                    updateEdit(false)
                    updateComment("")
                }
            )
        }
        if(project.actionType(ActionEnum.USER_ASK_TO_PROJECT)){
            joinBlock = <p>Vous avez demandé à rejoindre ce projet</p>
        }
        else {
            if(!edit){
                joinBlock = <div>
                    <Button onClick={join}>Rejoindre le projet</Button>
                </div>
            } else {
                function changeComment(e){
                    updateComment(e.target.value);
                }
                joinBlock = <div>
                    <Field name="comment" label={"Commentaire"} changeValue={changeComment} val={comment}></Field>
                    <Button onClick={joinSend}>Rejoindre le projet</Button>
                    <Button onClick={join}>Annuler</Button>
                </div>
            }
        }
    }
    return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView elem={project} isProject={true}></ProfilView>
           
            <ElemView 
                canEdit={canEdit} 
                parent={project}
                list={project.tecnoList} 
                keyword="tecno"
                title="Technologies"
                infoNothing="Aucune technologie utilisée"
                infoNothingEdit="Commencez à ajouter les technologies utilisées par votre projet">
                    
            </ElemView>
        </div>
        <div className="w-45 center-div">
            <ActualiteView
                rootUser={rootUser}
                user={project}
                you={false}>

            </ActualiteView>
        </div>
        <div className="w-25 right-div">
            <div className="card pb-2 pt-2 ps-3 pe-2 mt-2 me-2 bg-light bg-gradient overflow-hidden d-flex justify-content-start" >
                <div className="d-flex">
                    <h4>Paramètres du projet</h4>
                    <Button className="ms-2 mb-1 p-2 d-flex align-items-center justify-content-center" variant="primary" onClick={showProjectParam}>
                        <GearFill></GearFill>
                    </Button>
                    <Modal show={param} className="highest" onHide={unshowProjectParam} size="lg" >
                            <Modal.Header closeButton>
                                <Modal.Title>Paramètres du projet</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {
                                project.havePermission(PermEnum.MANAGE_ROLE) && (
                                    <div>
                                        <Button className="me-2" onClick={delProject}>Supprimer le projet</Button>
                                        <Button className="me-1" onClick={endProject}>Terminer le projet</Button>

                                        <Alert variant="danger" show={show} className="mt-3">
                                            <Alert.Heading>Voulez-vous vraiment supprimer le projet ?</Alert.Heading>
                                            <Button className="m-1" variant="primary" onClick={requestDelete}>
                                                    Valider
                                                </Button>
                                                <Button className="m-1" variant="outline-primary" onClick={handleClose}>
                                                    Annuler
                                                </Button>
                                        </Alert>       

                                        <Alert variant="danger" show={end} className="mt-3">
                                            <Alert.Heading>Voulez-vous vraiment terminer le projet ?</Alert.Heading>
                                            <Button className="m-1" variant="primary" onClick={requestFinish}>
                                                    Valider
                                                </Button>
                                                <Button className="m-1" variant="outline-primary" onClick={endClose}>
                                                    Annuler
                                                </Button>
                                        </Alert>
                                    </div>  
                                )
                            }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="m-1" variant="primary" onClick={unshowProjectParam}>
                                Annuler
                                </Button>
                            </Modal.Footer>
                        </Modal>
                </div>
            </div>
            <ProjectActionView 
                typeAction={[ActionEnum.IN_PROJECT]} 
                updatePage={updatePage} 
                user={rootUser} 
                project={project} 
                actionList={project.actionList}>

            </ProjectActionView>
            {
                joinBlock
            }


            {
                project.havePermission(PermEnum.MANAGE_MEMBERS) && (
                    <ProjectActionList user={rootUser} typeAction={[ActionEnum.USER_ASK_TO_PROJECT]} project={project} updatePage={updatePage} actionList={project.actionList}></ProjectActionList>
                )
            }

            

            <ManageRole project={project}></ManageRole>
        </div>
    </div>

}
export default ProjectFrame;