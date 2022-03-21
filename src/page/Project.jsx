import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import PermEnum from "../enum/PermEnum";
import ProjectActionList from "../object/list/ProjectActionList";
import Data from "../utils/Data";
import AddParticipant from "./AddParticipant";
import TecnoList from "../object/list/TecnoList";
import AddTecno from "../component/AddTecno";
import ProfilField from "../component/ProfilField";

function Project({project, user, updatePage}){
    const [edit, updateEdit] = useState(false);
    const [comment, updateComment] = useState("");
//>>>>>>> d7766fd4c0f8e4b40cefda4ad3d31bbd1600795d
    useEffect(function(){
        project.getBase();
        project.getAllAction();
        project.getAllTecno();
        project.getAllPermission();
    }, []);
    let canEdit = Data.isMe(user);
    function addParticipant(){
        updatePage(PageEnum.Add);
    }
    function manageRole(){
        updatePage(PageEnum.ManageRole);
    }
//<<<<<<< HEAD
        /*return <div>
            <p>Nom : {project.name}</p>
            <p>Description : {project.description}</p>
            <Button onClick={addParticipant}>Ajouter des participants</Button>
            <ProjectActionList typeAction={0} actionList={project.actionList}></ProjectActionList>
            
        
        </div>*/
//=======
    let addParticipantBlock;
    if(project.havePermission(PermEnum.MANAGE_MEMBERS)){
        addParticipantBlock = <Button onClick={addParticipant}>Ajouter des participants</Button>
    }
    let joinBlock;
    if(!project.isIn()){
        function join(){
            updateEdit(!edit);
        }
        function joinSend(){
            console.log("joinSend")
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
                    console.log(response)
                    console.log(project)
                    console.log(project.action)
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
    
    return <div>
        <ProfilField user={project} isProject={true} label={"Nom"} name={"nom"} canEdit={canEdit} value={project.name}></ProfilField>
        <p>--------------------------------------</p>
        <ProfilField user={project} isProject={true} label={"Description"} name={"description"} canEdit={canEdit} value={project.description}></ProfilField>
        <p>--------------------------------------</p>

        {
            joinBlock
        }
        <p>--------------------------------------</p>

        {
            addParticipantBlock
        }

        {
            project.havePermission(PermEnum.MANAGE_ROLE) && (
                <div>
                    <Button onClick={manageRole}>Gérer les role</Button>
                </div>
            )
        }

        <ProjectActionList typeAction={[ActionEnum.IN_PROJECT]} updatePage={updatePage} user={user} project={project} actionList={project.actionList}></ProjectActionList>

        {
            project.havePermission(PermEnum.MANAGE_MEMBERS) && (
                <ProjectActionList user={user} typeAction={[ActionEnum.USER_ASK_TO_PROJECT]} project={project} updatePage={updatePage} actionList={project.actionList}></ProjectActionList>
            )
        }
            
        
    
        <p>Liste des technologies utilisées</p>
        <TecnoList tecnoList={project.tecnoList}></TecnoList>

        <AddTecno project={project} canEdit={canEdit}></AddTecno>

    </div>

}
export default Project;