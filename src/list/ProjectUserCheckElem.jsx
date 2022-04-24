import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import Data from "../utils/Data";
import React from "react"

function ProjectUserCheckElem({project, list, elem}){

    const [role, updateRole] = useState("");
    const [change, updateChange] = useState(false);
    const [desc, updateDesc] = useState("");
    const [error, updateError] = useState("");

    let action;
    if(elem.actionList.size()>0){
        action = elem.actionList.get(0);
    }
    function changeDesc(e){
        updateDesc(e.target.value);
    }

    function inviter(){
        updateRole("")
        updateDesc("")
        updateChange(!change);
    }
    function inviterSend(){
        //if(role!=""){
            updateError("");
            project.makeRequest(
                'project/add/user',
                {
                    access_token: Data.accessToken(),
                    id_project: project.id_str,
                    id_user: elem.id_str,
                    description: desc
                },
                function(err){
                    console.log(err)
                    updateError("Un problème est survenue");
                },
                function(response){
                    list.applyRequest(response)
                }
            )
        /*}
        else {
            updateError("Selectionner un rôle")
        }*/
    }

    let content;
    if(action==undefined||action.type==3||action.type==4||action.type==5){
        let bonus;
        if(change){
            // <SelectRole updateRole={updateRole} project={project}></SelectRole>
            bonus = <div>
                <Field name="com" changeValue={changeDesc} label={"Commentaire"} val={desc}></Field>
            </div>
        }
        let bottom;
        if(change){
            bottom = <div>
                    <Button onClick={inviterSend}>Inviter</Button>
                    <Button onClick={inviter}>Annuler</Button>
                </div>
        }
        else {
            bottom = <div>
                    <Button onClick={inviter}>Inviter</Button>
                </div>
        }
        content =  <div>
            <p>    
                {elem.firstname + " "+ elem.lastname}
            </p>
            {bonus}
            <p>{error}</p>
            {bottom}
        </div>
    }
    else if(action.type==0){
        content = <div>
            <p>{elem.firstname + " "+ elem.lastname}</p>
            <p>Déjà dans le projet</p>
        </div>
    }
    else if(action.type==1){
        function refuserInviterSend(){
            updateError("");
            project.makeRequest(
                'project/del/user',
                {
                    access_token: Data.accessToken(),
                    id_project: project.id_str,
                    id_user: elem.id_str
                },
                function(err){
                    console.log(err)
                    updateError("Un problème est survenue");
                },
                function(response){
                    list.applyRequest(response)
                }
            )
        }
        content =  <div>
            <p>{elem.firstname + " "+ elem.lastname}</p>
            <p>Demande à rejoindre le projet</p>
            <Button onClick={refuserInviterSend}>Refuser</Button>
            <Button onClick={inviterSend}>Accepter</Button>
        </div>
    }
    else if(action.type==2){
        content =  <div>
            <p>{elem.firstname + " "+ elem.lastname}</p>
            <p>A été invité a rejoindre le projet</p>
        </div>
    }
    return <div>
        <p>----------------------------------------------</p>
        {
            content
        }
    </div>
}
export default ProjectUserCheckElem;