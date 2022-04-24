import List from "./List";
import Elem from "./Elem";
import React from "react"

const TYPE = {
    SKILL: 0
};
function ElemList({list,parent,keyword,canEdit}){
    function count(){
        return list.size();
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
            res = <Elem keyword={keyword} elem={list.get(index)} parent={parent} canEdit={canEdit}>
            </Elem>
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
export default ElemList;