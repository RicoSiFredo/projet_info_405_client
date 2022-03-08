import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import ProjectEnum from "../enum/ProjectEnum";
import ProjectActionList from "../object/list/ProjectActionList";
import AddParticipant from "./AddParticipant";


function Project({project}){
    const [pageProject, updatePageProject] = useState(ProjectEnum.Home)
    useEffect(function(){
        project.getAllAction();
    }, []);
    function addParticipant(){
        updatePageProject(ProjectEnum.Add);
    }
    if(pageProject.equals(ProjectEnum.Home)){
        return <div>
            <p>Nom : {project.name}</p>
            <p>Description : {project.description}</p>
            <Button onClick={addParticipant}>Ajouter des participants</Button>
            <ProjectActionList typeAction={0} actionList={project.actionList}></ProjectActionList>
        </div>
    } else {
        return <AddParticipant param={{id_project: project.id_str}} url={'/project/add/user/search'}>

        </AddParticipant>
    }
}
export default Project;


