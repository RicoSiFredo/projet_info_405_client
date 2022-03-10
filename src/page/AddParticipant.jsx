import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import ProjectUserCheckList from "../object/list/ProjectUserCheckList";
import Data from "../utils/Data";

function AddParticipant({project,}){

    const [name, updateName] = useState("");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC), "User"));

    useEffect(function(){
        chercher();
    }, [name])

    let url = '/project/add/user/search';
    let param = {
        "id_project": project.id_str
    };

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercherEvent(e){
        updateName(e.target.value);
    }
    function chercher(){
        list.reset();
        param.name = name;
        param.access_token = Data.accessToken();
        list.makeRequest(
            url, 
            param,
            function(error){
            },
            function(response){
            }
        )
    }
    return <div>
        <Field name={"name"} label="Nom" val={name} changeValue={chercherEvent}></Field>
        <Button variant="primary" onClick={chercher}>Rechercher</Button>
        <ProjectUserCheckList project={project} listElem={list}>
        </ProjectUserCheckList> 
    </div>
}
export default AddParticipant;