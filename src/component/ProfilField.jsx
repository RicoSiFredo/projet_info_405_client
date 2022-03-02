import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import Data from "../utils/Data";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";

function ProfilField({user, label, name, canEdit, value}){
    // canEdit est vrai uniquement si c'est mon profil
    const [edit, updateEdit] = useState(false);
    // variable qui correspond à savoir si on edit la valeur
    const [val, updateVal] = useState(value == undefined ? "" : value /* si il n'y a pas de valeur (undefined) on met "" */);
    // variable qui correspond à l'erreur
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    if(edit){
        // Si l'utilisateur est en train de changé ces données
        function edit(){
            // makeRequest applique automatiquement le resultat de la requete sur l'objet
            user.makeRequest(
                "user/set/"+name, 
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
            updateVal(value);
            // Annule le changement on retourne sur la vue de présentation
            // on remet la valeur initiale
        }
        return <div>
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control value={val} onInput={changeValue} type="text" placeholder={label} />
            </Form.Group>
            <p>{error.toString()}</p>
            <Button onClick={edit} variant="primary">Modifier</Button>
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
                <p>{label} : {val}</p>
                <Button onClick={startEdit} variant="primary">Modifier</Button>
            </div>
        }
        else {
            // vue de présentation sans modif possible
            return <div>
                <p>{label} : {val}</p>
            </div>
        }
    }
}
export default ProfilField;