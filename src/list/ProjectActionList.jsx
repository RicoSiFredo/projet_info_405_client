import { ActionEnum } from "../enum/ActionEnum";
import List from "./List";
import ProjectActionElem from "./ProjectActionElem";
import React from "react"

const TYPE = {
    ACTION: 0
}

function ProjectActionList({user, project, typeAction, updatePage, actionList}){
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
            res = <ProjectActionElem user={user} typeAction={typeAction} project={project} updatePage={updatePage} action={getList()[index]}>

            </ProjectActionElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    return <div>
        <List
            count={count}
            type={type}
            compute={compute}
            generateKey={key}>

        </List>
    </div>
    
}
export default ProjectActionList;