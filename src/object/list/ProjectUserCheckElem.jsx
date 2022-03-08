import { useState } from "react";
import { Button } from "react-bootstrap";

function ProjectUserCheckElem({project, list, elem}){

    const [role, updateRole] = useState(undefined);
    const [role, updateRole] = useState(undefined);

    let action;
    if(elem.actionList.size()>0){
        action = elem.actionList.get(0);
    }

    function inviter(){
        list.makeRequest
    }

    let content;
    if(action==undefined||action.type==3||action.type==4){
        content =  <div>
            <p>    
                {elem.firstname + " "+ elem.lastname}
            </p>
            <Button>Inviter</Button>
        </div>
    }
    else if(action.type==0){
        content =  <div>
            <p>{elem.firstname + " "+ elem.lastname}</p>
            <p>Déjà dans le projet</p>
        </div>
    }
    else if(action.type==1){
        content =  <div>
            <p>{elem.firstname + " "+ elem.lastname}</p>
            <p>Demande à rejoindre le projet</p>
            <Button>Accepter</Button>
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