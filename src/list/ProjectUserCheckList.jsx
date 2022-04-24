import List from "./List";
import ProjectUserCheckElem from "./ProjectUserCheckElem";
import React from "react"
const TYPE = {
    ELEM: 0
}
function ProjectUserCheckList({inviteElem, loading, project, listElem}){
    function count(){
        return listElem.size();
        // donne le nombre d'élément
    }
    function type(index){
        return TYPE.ELEM;
        // donne le type d'affichage pour l'index*
        // il y a que skill ici mais on peut imaginer le dernier
        // serait un load pour avoir les suivants
    }
    function compute(index){
        let typeLay = type(index);
        // on recupère le type de l'élément

        let res;
        
        if(typeLay==TYPE.ELEM){
            res = <ProjectUserCheckElem 
                project={project} 
                list={listElem} 
                inviteElem={inviteElem}
                elem={listElem.get(index)}>

            </ProjectUserCheckElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    let res;
    if (count()==0&&!loading){
        res = <div className="loader d-flex align-items-center justify-content-center">
            <p>Aucun utilisateur trouvé</p>
        </div>
    }
    else if (count()==0&&loading){
        res = <div className="loader d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    }
    else{
        res = <div className="mt-3">
            <List
                count={count}
                type={type}
                compute={compute}
                generateKey={key}>
        
            </List>
        </div>
    }
    return res;
}
export default ProjectUserCheckList;