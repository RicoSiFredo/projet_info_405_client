import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
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
    }, []);
    let canEdit = false;
    let [show, updateShow] = useState(false);
    let [end, updateEnd] = useState(false);

    function handleClose() {
        updateShow(false);
    }
    function delProject() {
        updateShow(true);
    }
    function endClose() {
        updateEnd(false);
    }
    function endProject() {
        updateEnd(true);
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
                    console.log(error)
                },
                function(response){
                    updateEdit(false)
                    updateComment("")
                }
            )
        }
        if(project.actionType(ActionEnum.USER_ASK_TO_PROJECT)){
            joinBlock = <p>Vous avez demandé à rejoindre ce groupe</p>
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
    console.log(project);
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
                project.havePermission(PermEnum.MANAGE_ROLE) && (
                    <div>
                        <Button onClick={delProject}>Supprimer le projet</Button>

                        <Button onClick={endProject}>Terminer le projet</Button>

                        <Modal show={show} className="highest" onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Voulez vous vraiment supprimer le projet ?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Button variant="primary" onClick={requestDelete}>
                                    Valider
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Fermer
                                </Button>
                            </Modal.Body>
                        </Modal>

                        <Modal show={end} className="highest" onHide={endClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Voulez vous vraiment terminer le projet ?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Button variant="primary" onClick={requestFinish}>
                                    Valider
                                </Button>
                                <Button variant="primary" onClick={endClose}>
                                    Fermer
                                </Button>
                            </Modal.Body>
                        </Modal>

                    </div>  
                )
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