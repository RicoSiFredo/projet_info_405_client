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

function Profil({back, user, updatePage}){
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
    }, []);

    let canEdit = Data.isMe(user);
    return <div>
        <p>Profil</p>
        <p>-----------------------------------------------</p>

        <ProfilField user={user} isProject={false} label={"Prénom"} name={"firstname"} canEdit={canEdit} value={user.firstname}></ProfilField>
        <p>-----------------------------------------------</p>
        <ProfilField user={user} isProject={false} label={"Nom"} name={"lastname"} canEdit={canEdit} value={user.lastname}></ProfilField>
        <p>-----------------------------------------------</p>
        <ProfilField user={user} isProject={false} label={"Description"} name={"description"} canEdit={canEdit} value={user.description}></ProfilField>
        <p>-----------------------------------------------</p>
        
        
        {user.skillList!=undefined&&(
            <SkillList skillList={user.skillList} user={user} canEdit={canEdit}>
            
            </SkillList>
        )}
        
        <AddSkill user={user} canEdit={canEdit}></AddSkill>
        
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
}
export default Profil;