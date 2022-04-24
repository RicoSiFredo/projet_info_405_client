import { Button } from "react-bootstrap";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import Data from "../utils/Data";
import React from "react"
import SimpleProfile from "../component/SimpleProfile";

function UserProjectElem({action, user, updatePage}){
    let bonus;
    if(ActionEnum.IN_PROJECT.is(action.type)){

    }
    else if(ActionEnum.PROJECT_ASK_TO_USER.is(action.type)){
        function accepter(){
            user.makeRequest(
                'user/add/project', 
                {
                    access_token: Data.accessToken(),
                    id_project: action.project.id_str,
                    description: ""
                },
                function(error){
                    console.log(error)
                },
                function(response){
                    console.log(response)
                }
            )
        }
        function refuser(){
            user.makeRequest(
                'user/del/project', 
                {
                    access_token: Data.accessToken(),
                    id_project: action.project.id_str
                },
                function(error){
                    console.log(error)
                },
                function(response){
                    console.log(response)
                }
            )
        }
        bonus = <div>
            <p>{action.description}</p>
            <Button variant="primary" onClick={accepter}>Accepter</Button>
            <Button variant="primary" onClick={refuser}>Refuser</Button>
        </div>
    }
    else if(ActionEnum.PROJECT_ASK_TO_USER_REFUSE.is(action.type)){
        bonus = <p>Vous avez refusé l'invitation</p>
    }
    return <SimpleProfile 
        user={user} 
        isProject={true}
        updatePage={updatePage} 
        action={action}>

    </SimpleProfile>
}
export default UserProjectElem;