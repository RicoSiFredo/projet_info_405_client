import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import React from "react"
import ErrorEats from "../object/base/ErrorEats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import Form405 from "../component/Form405";

function CreateProjet({back, user, updatePage}){
    const [name, updateName] = useState("");
    const [description, updateDescription] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function creer(){
        user.makeRequest(
            '/project/create', 
            {
                access_token: Data.accessToken(),
                name: name,
                description: description
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG);
            },
            function(response){
                console.log(response)
                if(Response.isSuccessResponse(response)){
                    back();
                }
                else {
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                }
            }
        )
    }
    function changeValueName(e){
        updateName(e.target.value);
    }
    function changeValueDescription(e){
        updateDescription(e.target.value);
    }
    /*
    <SkillBlock></SkillBlock>
    */
    /*inutile ? <Button variant="primary" onClick={back}>Home</Button>*/
    let content = <div>
        <Field name={"name"} label="Nom" val={name} changeValue={changeValueName}></Field>
        <Field name={"description"} label="Description" val={description} changeValue={changeValueDescription}></Field>
    </div>
    return <div>
        <Form405 
            error={error}
            content={content}
            onSubmit={creer}
            info="Commencer à réaliser votre idée !"
            title="Créer un projet">

        </Form405>
    </div>
}
export default CreateProjet;