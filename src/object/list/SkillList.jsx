import List from "./List";
import SkillElem from "./SkillElem";

const TYPE = {
    SKILL: 0
};
function SkillList({skillList}){
    function count(){
        return skillList.size();
        // donne le nombre d'élément
    }
    function type(index){
        return TYPE.SKILL;
        // donne le type d'affichage pour l'index*
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        
        if(typeLay==TYPE.SKILL){
            res = <SkillElem skill={skillList.get(index)}>

            </SkillElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    return <div>
        <p>Liste des compétences : </p>
        <List
            count={count}
            type={type}
            compute={compute}
            generateKey={key}>

        </List>
    </div>
}
export default SkillList;