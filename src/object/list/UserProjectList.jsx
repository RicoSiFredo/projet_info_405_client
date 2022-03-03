import List from "./List";
import UserProjectElem from "./UserProjectElem";

const TYPE = {
    SKILL: 0
};
function UserProjectList({user, updatePage, actionList}){
    function count(){
        return actionList.size();
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
            res = <UserProjectElem user={user} updatePage={updatePage} action={actionList.get(index)}>

            </UserProjectElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    return <List
        count={count}
        type={type}
        compute={compute}
        generateKey={key}>

    </List>
}
export default UserProjectList;