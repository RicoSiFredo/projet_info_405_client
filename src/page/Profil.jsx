import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../list/ElemList";
import UserProjectList from "../list/UserProjectList";
import Data from "../utils/Data";
import Login from "./Login";
import React from "react"
import ProfilView from "../component/ProfilView";
import Elem from "../list/Elem";
import SkillView from "../component/ElemView";
import ElemView from "../component/ElemView";
import UserProjectView from "../component/UserProjectView";
import NotifList from "../list/NotifList";


function Profil({back, user, updatePage}){
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
        user.getNotif();
    }, []);

    console.log(user.notifList)
    let canEdit = Data.isMe(user);
    return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView elem={user} isProject={false}></ProfilView>
            <ElemView 
                canEdit={canEdit} 
                parent={user}
                list={user.skillList} 
                keyword="skill"
                title="Compétences"
                infoNothing="Aucune compétences"
                infoNothingEdit="Commencer à ajouter des compétences">
                    
            </ElemView>
        </div>
        <div className="w-45 center-div">
            <NotifList
                list={user.notifList}>

            </NotifList>
        </div>
        <div className="w-25 right-div">
            <UserProjectView 
                updatePage={updatePage} 
                user={user}>

            </UserProjectView>
        </div>
    </div>
}
export default Profil;