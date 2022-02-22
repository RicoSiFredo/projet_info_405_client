import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ProfilField from "../component/ProfilField";
import PageEnum from "../enum/PageEnum";
import SkillList from "../object/list/SkillList";

function Profil({user, updatePage}){
    useEffect(function(){
        user.getAllSkill();
    }, [])
    function back(){
        updatePage(PageEnum.Home);
    }
    return <div>
        <p>Profil</p>

        <ProfilField user={user} label={"Prénom"} name={"firstname"} canEdit={true} value={user.firstname}></ProfilField>
        <ProfilField user={user} label={"Nom"} name={"lastname"} canEdit={true} value={user.lastname}></ProfilField>
        <ProfilField user={user} label={"Description"} name={"description"} canEdit={true} value={user.description}></ProfilField>
        
        <SkillList skillList={user.skillList}>

        </SkillList>
        <Button variant="primary">Ajouter un skill</Button>

        <Button variant="primary" onClick={back}>Home</Button>
    </div>
}
export default Profil;