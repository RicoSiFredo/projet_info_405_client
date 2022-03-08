import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import ProjectUserCheckList from "../object/list/ProjectUserCheckList";
import Data from "../utils/Data";

function AddParticipant({project, url, param}){
    const [name, updateName] = useState("");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    useEffect(function(){
        chercher();
    }, [name])

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
        <Button variant="primary" onClick={chercher}>Chercher</Button>
        <ProjectUserCheckList project={project} listElem={list}>
        </ProjectUserCheckList> 
    </div>
}
export default AddParticipant;