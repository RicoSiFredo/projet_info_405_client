import { Button } from "react-bootstrap";
import { ActionEnum } from "../../enum/ActionEnum";
import PageEnum from "../../enum/PageEnum";
import PermEnum from "../../enum/PermEnum";
import Data from "../../utils/Data";
import React from "react"

function ProjectActionElem({user, updatePage, typeAction, project, action}){
    
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
    
    let button;
    let text;
    if (ActionEnum.IN_PROJECT.got(typeAction)){
        text = <p>Role : {action.role.name}</p>
    }
    if(ActionEnum.IN_PROJECT.got(typeAction)&&
    !action.root&&project.isIn()){
        if (action.equals(project.action)){
            button = <div>
                <Button onClick={exclure}>Quitter</Button>
            </div>
        }
        else if(project.havePermission(PermEnum.MANAGE_MEMBERS)){
            button = <div>
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
        button = <div>
            <p>{action.description}</p>
            <Button onClick={accepter}>Accepter</Button>
            <Button onClick={refuser}>Refuser</Button>
        </div>
    }
    return <div>
        <p>{action.user.firstname + " " + action.user.lastname}</p>
        {text}
        {button}
        <Button onClick={openProfil}>Voir</Button>
        <p>------------------------------</p>
    </div>
}
export default ProjectActionElem;