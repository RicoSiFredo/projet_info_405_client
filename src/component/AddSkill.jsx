import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";

function AddSkill({user,canEdit}){

    const [edit, updateEdit] = useState(false);
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    if(edit){
        // Si l'utilisateur est en train de changer ses données
        function edit(){

            user.makeRequest(
                "user/add/skill", 
                {
                    access_token: Data.accessToken(),
                    value: val
                },
                function(error){
                    updateError(ErrorEats.WENT_WRONG);
                },
                function(response){
                    if(Response.isSuccessResponse(response)){
                        updateEdit(false);
                    }
                    else {
                        updateError(new ErrorEats(
                            Response.error(response)
                        ));
                    }
                }
            )
           
        }
        function changeValue(e){
            updateVal(e.target.value);
            // Change la valeur du texte
        }
        function cancelEdit(){
            updateEdit(false);
            // Annule le changement on retourne sur la vue de présentation
        }
        return <div>
            <Form.Group className="mb-3">
                <Form.Control value={val} onInput={changeValue} type="text"/>
            </Form.Group>
            <p>{error.toString()}</p>
            <Button onClick={edit} variant="primary">Ajouter le skill</Button>
            <Button onClick={cancelEdit} variant="primary">Annuler</Button>
        </div>
    }
    else {
        // vue de présentation
        if(canEdit){
            // si on a la permission de modifier
            function startEdit(){
                updateError(ErrorEats.NO_ERROR);
                updateEdit(true);
                // passe à la vue de modification
            }
            return <div>
                <Button variant="primary" onClick={startEdit}>Ajouter un skill</Button>
            </div>
        }
    }
}
export default AddSkill;