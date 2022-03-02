import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import SkillBlock from "../component/SkillBlock";
import PageEnum from "../enum/PageEnum";

function Projet({user, updatePage}){
    const [name, updateName] = useState("");
    const [description, updateDescription] = useState("");
    function back(){
        updatePage(PageEnum.Home);
    }
    function creer(){

    }
    function changeValueName(e){
        updateName(e.target.value);
    }
    function changeValueDescription(e){
        updateName(e.target.value);
    }
    return <div>
        <Button variant="primary" onClick={back}>Home</Button>
        <Field name={"name"} label="Nom" val={name} changeValue={changeValueName}></Field>
        <Field name={"description"} label="Description" val={description} changeValue={changeValueDescription}></Field>
        <SkillBlock></SkillBlock>
        <Button variant="primary" onClick={creer}>Creer</Button>
    </div>
}
export default Projet;