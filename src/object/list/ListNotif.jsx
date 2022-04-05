import { ListGroup } from "react-bootstrap";
import ProjectNotif from "../../component/notif/ProjectNotif";
import List from "./List";

const TYPE = {
    PROJECT: 0,
    UNKNOW: -1
}

function ListNotif({listNotif}){
    function count(){
        return listNotif.size();
        // donne le nombre d'élément
    }
    function type(index){
        if(listNotif.get(index)._type=="Action"){
            return TYPE.PROJECT;
        }
        else {
            return TYPE.UNKNOW;
        }
        // donne le type d'affichage pour l'index*
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        let res;
        
        if(typeLay==TYPE.PROJECT){
            res = <ProjectNotif notif={listNotif.get(index)}>
            </ProjectNotif>
        }

        return res;
    }
    function key(index){
        return "notif-"+index;
        // la clé de chaque élément de la liste
    }
    return <div style={{width: "300px"}}>
        <p>Liste des notifications : </p>
        <ListGroup>
            <List
                count={count}
                type={type}
                compute={compute}
                generateKey={key}>

            </List>
        </ListGroup>
    </div>
}
export default ListNotif;