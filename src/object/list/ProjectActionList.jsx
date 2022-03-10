import { ActionEnum } from "../../enum/ActionEnum";
import List from "./List";
import ProjectActionElem from "./ProjectActionElem";

const TYPE = {
    ACTION: 0
}

function ProjectActionList({project, typeAction, updatePage, actionList}){
    function getList(){
        let list = [];
        for(let i = 0; i < actionList.size(); i++){
            if((new ActionEnum(actionList.get(i).type)).got(typeAction)){
                list.push(actionList.get(i));
            }
        }
        return list
    }
    function count(){
        return getList().length;
        // donne le nombre d'élément
    }
    function type(index){
        return TYPE.ACTION;
        // donne le type d'affichage pour l'index*
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        
        if(typeLay==TYPE.ACTION){
            res = <ProjectActionElem typeAction={typeAction} project={project} updatePage={updatePage} action={getList()[index]}>

            </ProjectActionElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    let head;
    let text;
    if(ActionEnum.IN_PROJECT.got(typeAction)){
        head = <p>Liste des participants</p>
    }
    else if(ActionEnum.USER_ASK_TO_PROJECT.got(typeAction)){
        head = <p>Utilisateurs qui veulent rejoindre le projet</p>
        text = <p>Aucune demande</p>
    }
    if(count()>0){
        return <div>
            {head}
            <List
                count={count}
                type={type}
                compute={compute}
                generateKey={key}>
    
            </List>
        </div>
    } else {
        return <div>
            {head}
            {text}
        </div>
    }
}
export default ProjectActionList;