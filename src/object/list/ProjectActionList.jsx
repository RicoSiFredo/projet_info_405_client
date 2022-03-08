import List from "./List";
import ProjectActionElem from "./ProjectActionElem";

const TYPE = {
    ACTION: 0
}

function ProjectActionList({project, typeAction, updatePage, actionList}){
    function getList(){
        let list = [];
        for(let i = 0; i < actionList.size(); i++){
            if(actionList.get(i).type == typeAction){
                list.push(actionList.get(i));
            }
        }
        return list
    }
    function count(){
        let countAct = 0;
        for(let i = 0; i < actionList.size(); i++){
            if(actionList.get(i).type == typeAction){
                countAct++;   
            }
        }
        return countAct;
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
            res = <ProjectActionElem project={project} updatePage={updatePage} action={getList()[index]}>

            </ProjectActionElem>
        }
        return res;
    }
    function key(index){
        return "skill-"+index;
        // la clé de chaque élément de la liste
    }
    let head;
    if(typeAction == 0){
        head = <p>Liste des participants</p>
    }
    return <div>
        {head}
        <List
            count={count}
            type={type}
            compute={compute}
            generateKey={key}>

        </List>
    </div>
}
export default ProjectActionList;