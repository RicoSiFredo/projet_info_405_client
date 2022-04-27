import React from "react"
import SimpleProfile from "../component/SimpleProfile";

function Notif({notif, updatePage}){
    let title;
    let text;
    if(notif.current_type == 6){
        title = "Projet"
        text = "Création d'un nouveau projet";
    }
    return <div>
        <h4>{title}</h4>
        <p className="mb-0">{text}</p>
        <SimpleProfile
            border={false}
            elem={notif.elem} 
            updatePage={updatePage}>

        </SimpleProfile>
    </div>
}
export default Notif;