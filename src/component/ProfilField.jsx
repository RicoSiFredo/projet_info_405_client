import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorEats from "../object/base/ErrorEats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import React from "react"
import { PenFill } from "react-bootstrap-icons";
import { useEffect } from "react";

function ProfilField({user, isProject, label, name, canEdit, value, className="", multipleLine=false, tag="p"}){
    // canEdit est vrai uniquement si c'est mon profil
    const [edit, updateEdit] = useState(false);
    // variable qui correspond à savoir si on edit la valeur
    const [val, updateVal] = useState(value == undefined ? "" : value /* si il n'y a pas de valeur (undefined) on met "" */);
    // variable qui correspond à l'erreur
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    useEffect(() => {
        if(canEdit&&val==""){
            updateEdit(true);
        }
    }, [])
    useEffect(() => {
        updateVal(value);
        if(canEdit&&(value==""||value==undefined)){
            updateEdit(true);
        }
        else {
            updateEdit(false);
        }
    }, [value])

    if(!canEdit&&(val==""||val==undefined)){
        return <div></div>
    }
    else if((canEdit&&(val==""||val==undefined))||edit){
        // Si l'utilisateur est en train de changé ces données
        function edit(){
            let url = "";
            // makeRequest applique automatiquement le resultat de la requete sur l'objet
            if(isProject){
                url = "project/set/"+name;
            }
            else {
                url = "user/set/"+name;
            }
            user.makeRequest(
                url,
                {
                    access_token: Data.accessToken(),
                    value: val,
                    id: user.id_str
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
            if((val==""||val==undefined)){
                updateEdit(true);
            }
            updateVal(e.target.value);
            // Change la valeur du texte
        }
        function cancelEdit(){
            if ( canEdit && ( value == undefined || value == "" ) ) {
                updateVal("");
            }
            else {
                updateEdit(false);
                updateVal(value);
            }
            // Annule le changement on retourne sur la vue de présentation
            // on remet la valeur initiale
        }
        if (multipleLine){
            return <div>
                <textarea value={val} onInput={changeValue} type="text" placeholder={label} />
                <p className="ms-1 mb-2 mt-1">{error.toString()}</p>
                <Button onClick={edit} variant="primary">Modifier</Button>
                <Button onClick={cancelEdit} variant="outline-primary" className="ms-2">Annuler</Button>
            </div>
        }
        else {
            return <div>
                <div className="input-group">
                    <Form.Control value={val} onInput={changeValue} type="text" placeholder={label} />
                    <Button onClick={edit} variant="primary">Modifier</Button>
                    <Button onClick={cancelEdit} variant="outline-primary">Annuler</Button>
                </div>
                <p className="ms-1 mb-2 mt-1">{error.toString()}</p>
            </div>
        }
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
            let content = <p className={className+"mb-0"}>{val}</p>
            if(tag == "h5"){
                content = <h5 className={className+"mb-0"}>{val}</h5>
            }
            else if(tag == "h4"){
                content = <h4 className={className+"mb-0"}>{val}</h4>
            }
            else if(tag == "h3"){
                content = <h3 className={className+"mb-0"}>{val}</h3>
            }
            else if(tag == "h2"){
                content = <h2 className={className+"mb-0"}>{val}</h2>
            }
            else if(tag == "h1"){
                content = <h1 className={className+"mb-0"}>{val}</h1>
            }
            return <div className="d-flex">
                {content}
                <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={startEdit} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                        <PenFill></PenFill>
                    </Button>
                </div>
            </div>
        }
        else if(val!=""){
            // vue de présentation sans modif possible
            return <div>
                <p>{val}</p>
            </div>
        }else{
            return <div></div>
        }
    }
}
export default ProfilField;