import { useEffect } from "react";
import { Button } from "react-bootstrap";
import ProfilField from "../component/ProfilField";
import PageEnum from "../enum/PageEnum";
import SkillList from "../object/list/SkillList";
import UserProjectList from "../object/list/UserProjectList";

function Profil({back, user, updatePage}){
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
    }, []);
    function creerProjet(){
        updatePage(PageEnum.CreateProject);
    }
    return <div>
        <p>Profil</p>

        <ProfilField user={user} label={"Prénom"} name={"firstname"} canEdit={true} value={user.firstname}></ProfilField>
        <ProfilField user={user} label={"Nom"} name={"lastname"} canEdit={true} value={user.lastname}></ProfilField>
        <ProfilField user={user} label={"Description"} name={"description"} canEdit={true} value={user.description}></ProfilField>
        
        <SkillList skillList={user.skillList}>

        </SkillList>
        
        <Button variant="primary">Ajouter un skill</Button>

        <p>Liste des Projets</p>

        <UserProjectList user={user} updatePage={updatePage} actionList={user.actionList}>

        </UserProjectList>

        <Button variant="primary" onClick={creerProjet}>Créer un Projet</Button>
    </div>
}
export default Profil;