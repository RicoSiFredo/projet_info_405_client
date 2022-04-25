import List from "./List";
import React from "react"
import Notif from "./Notif";

const TYPE = {
    NOTIF: 0
};
function NotifList({list}){
    function count(){
        return list.size();
        // donne le nombre d'élément
    }
    function type(index){
        return TYPE.NOTIF;
        // donne le type d'affichage pour l'index*
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        if(typeLay==TYPE.NOTIF){
            res = <Notif notif={list.get(index)}>
            </Notif>
        }
        return res;
    }
    function key(index){
        return "notif-"+index;
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
export default NotifList;