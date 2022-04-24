import { Button } from "react-bootstrap";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import Data from "../utils/Data";
import List from "./List";
import UserProjectElem from "./UserProjectElem";
import React from "react"

const TYPE = {
    PROJECT: 0
};
function UserProjectList({typeAction, user, updatePage, actionList}){
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
        return TYPE.PROJECT;
        // donne le type d'affichage pour l'index*
        // il y a que PROJECT ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        
        if(typeLay==TYPE.PROJECT){
            res = <UserProjectElem user={user} updatePage={updatePage} action={getList()[index]}>

            </UserProjectElem>
        }
        return res;
    }
    function key(index){
        return "project-"+index;
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
export default UserProjectList;