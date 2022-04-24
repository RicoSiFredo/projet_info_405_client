import React, { useEffect,useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";
import Data from "../utils/Data";
import Response from "../utils/Response";

function AddTecno({project,canEdit}){

    const [edit, updateEdit] = useState(false);
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    
    useEffect(function(){
        chercher();
    }, [val])

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    
    function chercher(){
        list.reset();
        list.makeRequest(
            'search/tecno',
            {
                name: val,
                project: project.id_str
            },
            function(error){
            
            },
            function(response){
                console.log(list);
            }
        )
    }

    if(edit){
        function edit(){

            project.makeRequest(
                "project/add/tecno", 
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

        function addRelation(name) {
            project.makeRequest(
                "project/add/tecnorelation", 
                {
                    access_token: Data.accessToken(),
                    value: name,
                    id_project : project.id_str
                },
                function(error){
                    console.log(error);
                    updateError(ErrorEats.WENT_WRONG);
                },
                function(response){
                    console.log(response);
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
        function chercherEvent(e){
            updateVal(e.target.value);
            // Change la valeur du texte
        }
        function cancelEdit(){
            updateEdit(false);
            // Annule le changement on retourne sur la vue de présentation
        }

        let button;
            if(list.size() === 0){
                button = <Button onClick={edit} variant="primary">Ajouter la tecnologie</Button>
            }

        return <div>
            <Form.Group className="mb-3">
                <Form.Control value={val} onChange={chercherEvent} type="text"/>
            </Form.Group>
            <p>{error.toString()}</p>
            <Button onClick={cancelEdit} variant="primary">Annuler</Button>
            {
            list.map(function(object, index) {
                return <div key={index}>
                    <p>{object.name}</p> 
                    <Button onClick={()=>addRelation(object.name)} variant="primary">Selectionner</Button>

                </div>
            })
            }
            {button}
        </div>

    }
    else {
        // vue de présentation
        if(canEdit){
            // si on a la permission de modifier
            function startEdit(){
                updateError(ErrorEats.NO_ERROR);
                updateEdit(true);
                chercher();
                // passe à la vue de modification
            }
            return <div>
                <Button variant="primary" onClick={startEdit}>Ajouter une tecnologie</Button>
            </div>
        }
        else {
            return <p></p>
        }
    }
}
export default AddTecno;