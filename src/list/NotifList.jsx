import List from "./List";
import React from "react"
import Notif from "./Notif";

const TYPE = {
    NOTIF: 0,
    ADD: 1
};
function NotifList({user, rootUser, you, list}){
    let canAdd = true;
    function count(){
        let res;
        if(list!=undefined){
            if(canAdd){
                res = list.size() + 1;
            }
            else {
                res = list.size();
            }
        }
        else {
            if(canAdd){
                res = 1;
            }
            else {
                res = 0;
            }
        }
        return res;
        // donne le nombre d'élément
    }
    function type(index){
        // donne le type d'affichage pour l'index
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
        let res;
        if(canAdd&&index == 0){
            res = TYPE.ADD;
        }
        else {
            res = TYPE.NOTIF;
        }
        return res;
    }
    function getMoin(){
        let res = 0;
        if(canAdd){
            res = 1;
        }
        return res;
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        if(typeLay==TYPE.ADD){
            return <div>
                
            </div>
        }
        else if(typeLay==TYPE.NOTIF){
            res = <Notif 
                user={user}
                rootUser={rootUser}
                you={you}
                notif={list.get(index-getMoin())}>
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