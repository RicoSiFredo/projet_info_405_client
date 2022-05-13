import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Field from "../component/Field";
import Data from "../utils/Data";
import React from "react"
import SimpleProfile from "../component/SimpleProfile";
import ErrorEats from "../object/base/ErrorEats";

function ProjectUserCheckElem({inviteElem, project, list, elem}){

    const [role, updateRole] = useState("");
    const [change, updateChange] = useState(false);
    const [desc, updateDesc] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    let action;
    if(elem.actionList.size()>0){
        action = elem.actionList.get(0);
    }
    function inviter(){
        inviteElem(elem);
    }
    function inviterSend(){
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
    }

    let content;
    if(action==undefined||action.type==3||action.type==4||action.type==5){
        content = <div className="mt-2 mb-1">
            <Button className="ms-2" onClick={inviter}>Inviter</Button>
        </div>
    }
    else if(action.type==0){
        content = <p className="ms-2 mb-0">Déjà dans le projet</p>
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
            <p>Demande à rejoindre le projet</p>
            <Button onClick={refuserInviterSend}>Refuser</Button>
            <Button onClick={inviterSend}>Accepter</Button>
        </div>
    }
    else if(action.type==2){
        content = <p className="ms-2 mb-0">A été invité a rejoindre le projet</p>
    }
    return <div>
        <SimpleProfile
            elem={elem}
            content={content}>

        </SimpleProfile>
    </div>
}
export default ProjectUserCheckElem;