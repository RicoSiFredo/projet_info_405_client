import { Button, ListGroup } from "react-bootstrap";
import { ActionEnum } from "../../enum/ActionEnum";
import React from "react"

function ProjectNotif({notif, user}){

    function openProject(){
        //window.location.href = "/project/"+notif.project.id;
    }

    function content(){
        return <div>
            <div className="mt-2">
                <p className="text-dark mb-2">Vous invite à rejoindre le projet.</p>
                <p className="text-dark mb-2">{notif.current_description}</p>
            </div>
            <div className="mt-3 mb-1">
                <Button variant="primary" onClick={openProject}>Accepeter</Button>
                <Button variant="outline-primary ms-3">Refuser</Button>
            </div>
        </div>
    }
    function variant(){
        if(ActionEnum.IN_PROJECT.is(notif.type)){
            return "primary"
        }
        else if(ActionEnum.PROJECT_ASK_TO_USER.is(notif.type)){
            return "info"
        }
        //else if(notif.type.equals(NotifTypeEnum.Accept)){
        //    return "success"
        //}
        //else if(notif.type.equals(NotifTypeEnum.Refuse)){
        //    return "danger"
        //}
    }

    return <ListGroup.Item onClick={openProject} variant={variant()}>
        <div>
            <div className="mt-1 d-flex align-self-center">
                <img className="profil-notif" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" alt="Logo du projet"></img>
                <h5 className="text-dark ms-3 mt-1">{notif.project.name}</h5>
            </div>
            {content()}
        </div>
    </ListGroup.Item>
}

export default ProjectNotif;