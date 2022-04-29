import React from "react"
import { Button } from "react-bootstrap";
import SimpleProfile from "../component/SimpleProfile";
import Project from "../object/Project";
import Data from "../utils/Data";

const CREATE_PROJECT = 6;
const IN_PROJECT = 0;
const USER_ASK_TO_PROJECT = 1;
const PROJECT_ASK_TO_USER = 2;
const USER_REFUSE_TO_PROJECT = 3;
const PEOJECT_REFUSE_TO_USER = 4;
const LEAVE = 5;

const COLOR_ARRAY = [
    {
        color: "bg-success",
        elem_list: [ CREATE_PROJECT, IN_PROJECT ]
    }, {
        color: "bg-error",
        elem_list: [ LEAVE, USER_REFUSE_TO_PROJECT, PEOJECT_REFUSE_TO_USER ]
    }, {
        color: "bg-warning",
        elem_list: [ USER_ASK_TO_PROJECT, PROJECT_ASK_TO_USER ]
    }
]

function Notif({rootUser, you, notif, updatePage}){
    let title;
    let text;
    let message;
    let user;
    let acceptText;
    let acceptFunc;
    let refuseText;
    let refuseFunc;
    let cantText;
        
    user = notif.parent;
    let elem;
    if(notif.current_type == CREATE_PROJECT){
        elem = notif.elem;
        title = "Nouveau projet"
        if(!you){
            text = user.getDisplayName() + " a créé un nouveau projet.";
        }
        else {
            text = "Vous avez créer un nouveau projet.";
        }
    }
    else if(notif.current_type == IN_PROJECT){
        elem = notif.elem.project;
        console.log(notif.elem.project)
        title = "Nouveau projet"
        if(!you){
            text = user.getDisplayName()+" a rejoint le Edge8.";
        }
        else {
            text = "Vous avez rejoint le Edge8.";
        }
        //text = "Vous avez été inviter à rejoindre "+elem.getDisplayName();
    }
    else if(notif.current_type == PROJECT_ASK_TO_USER){
        elem = notif.elem.project;
        title = "Invitation"
        if(!you){
            text = user.getDisplayName() + " a créé un nouveau projet.";
        }
        else {
            text = "Vous avez été inviter à rejoindre "+elem.getDisplayName()+", envoyé par "+notif.by.getDisplayName()+".";
        }
        message = notif.current_description;
        if(notif.final_type == IN_PROJECT){
            cantText = "Vous avez accepté l'invitation."
        }
        else if(notif.final_type == USER_REFUSE_TO_PROJECT){
            cantText = "Vous avez refusé l'invitation."
        }
        else if (notif.current_date == notif.elem.date){
            cantText = "Invitation expiré."
        }
        else if(notif.elem.type == IN_PROJECT){
            cantText = "Vous êtes déjà dans le projet."
        }
        else {
            acceptText = "Accepter";
            acceptFunc =  function(){
                user.makeRequest(
                    'user/add/project', 
                    {
                        access_token: Data.accessToken(),
                        id_project: notif.elem.project.id_str,
                        description: ""
                    },
                    function(error){ },
                    function(response){ }
                )
            }
            refuseText = "Refuser";
            refuseFunc = function(){
                user.makeRequest(
                    'user/del/project', 
                    {
                        access_token: Data.accessToken(),
                        id_project: notif.elem.project.id_str
                    },
                    function(error){
                        console.log(error)
                    },
                    function(response){
                        console.log(response)
                    }
                )
            };
        }
    }
    else {
        elem = notif.elem;
        title = "Pas définie";
        text = "Pas définie";
    }
    let color = undefined;
    let i = 0;
    while(color == undefined&&i<COLOR_ARRAY.length){
        let current_elem = COLOR_ARRAY[i];
        if(current_elem.elem_list.includes(notif.current_type)){
            color = current_elem.color;
        }
        i += 1;
    }
    let style;
    if(!you){
        style = "card pt-1 mt-2 ms-2 me-2 bg-light bg-gradient overflow-hidden";
    }
    else{
        style = "border-top border-secondar position-relative pb-2 ms-2 me-2 overflow-hidden"
    }
    return <div className={style}>
        <div className="z-top position-relative">
            <div className="pt-2 pe-3 ps-3 pb-1">
                <p className="mb-0">{text}</p>
                {message!=undefined&&<p className="mt-1 mb-0">{message}</p>}
            </div>
            <div className="mb-2">
                <SimpleProfile
                    rootUser={rootUser}
                    border={false}
                    elem={elem} 
                    updatePage={updatePage}
                    isProject={ elem instanceof Project}>

                </SimpleProfile>
            </div>
            {(acceptText!=undefined||cantText!=undefined||acceptText!=undefined)&&
                <div className="ms-3 mt-2 mb-1">
                    {acceptText!=undefined&&
                        <Button onClick={acceptFunc}>{acceptText}</Button>
                    }
                    {refuseText!=undefined&&
                        <Button onClick={refuseFunc} className="ms-2" variant="outline-primary">{refuseText}</Button>
                    }
                    {cantText!=undefined&&
                        <p>{cantText}</p>
                    }
                </div>
            }
        </div>
        {you&&<div className={"opacity-1 position-absolute top-0 bottom-0 start-0 end-0 behind z-bottom "+color}>

        </div>}
    </div>
}
export default Notif;