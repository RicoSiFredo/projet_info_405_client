import { useEffect } from "react";
import { Button } from "react-bootstrap";
import AddSkill from "../component/AddSkill";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../object/list/SkillList";
import UserProjectList from "../object/list/UserProjectList";
import Data from "../utils/Data";
import Login from "./Login";
import React from "react"
import ProfilView from "../component/ProfilView";
import SkillElem from "../object/list/SkillElem";
import SkillView from "../component/SkillView";


function Profil({back, user, updatePage}){
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
    }, []);

    let canEdit = Data.isMe(user);
    return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView elem={user} isProject={false}></ProfilView>
            <SkillView user={user}></SkillView>
        </div>
        <div className="w-45 center-div">
        </div>
        <div className="w-25 right-div">
            
            <p>-----------------------------------------------</p>

            <UserProjectList typeAction={[ActionEnum.IN_PROJECT]} user={user} updatePage={updatePage} actionList={user.actionList}>

            </UserProjectList>

            {
                canEdit && ( 
                <div>  
                    <p>-----------------------------------------------</p> 
                    <UserProjectList typeAction={[ActionEnum.PROJECT_ASK_TO_USER, ActionEnum.PROJECT_ASK_TO_USER_REFUSE]} user={user} updatePage={updatePage} actionList={user.actionList}>

                    </UserProjectList>
                </div> )
            }
        </div>
    </div>
}
export default Profil;