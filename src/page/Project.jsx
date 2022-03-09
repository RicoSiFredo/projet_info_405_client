import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import PermEnum from "../enum/PermEnum";
import ProjectActionList from "../object/list/ProjectActionList";
import Data from "../utils/Data";

function Project({project, updatePage}){
    const [edit, updateEdit] = useState(false);
    const [comment, updateComment] = useState("");
    useEffect(function(){
        project.getBase();
        project.getAllAction();
    }, []);
    function addParticipant(){
        updatePage(PageEnum.Add);
    }
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
                    if(!project.action.init){
                        let found = false;
                        let i = 0;
                        while(!found&&i<project.actionList.size()){
                            if(project.actionList.get(i).user.id_str==project.parent.id_str){
                                project.action.set(project.actionList.get(i));
                                found = true;
                            }
                            i++;
                        }
                    }
                    updateEdit(false)
                }
            )
        }
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
    return <div>
        <p>Nom : {project.name}</p>
        <p>--------------------------------------</p>
        <p>Description : {project.description}</p>
        <p>--------------------------------------</p>

        {
            joinBlock
        }
        <p>--------------------------------------</p>

        {
            addParticipantBlock
        }

        <ProjectActionList typeAction={[ActionEnum.IN_PROJECT]} project={project} actionList={project.actionList}></ProjectActionList>

        {
            project.havePermission(PermEnum.MANAGE_MEMBERS) && (
                <ProjectActionList typeAction={[ActionEnum.USER_ASK_TO_PROJECT]} project={project} actionList={project.actionList}></ProjectActionList>
            )
        }
    </div>
}
export default Project;


