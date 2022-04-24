import React, { useEffect,useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import Project from "../object/Project";
import ErrorModal from "../object/base/ErrorModal";

let modal = new ErrorModal();
modal.addErrorMessage(
    ErrorEats.SUCCESS,
    "L'élément a été ajouté avec succès."
)
function AddElem({elem,keyword, handleClose}){
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    
    let baseKeyword = "user"
    if(elem instanceof Project){
        baseKeyword = "project"
    }

    useEffect(function(){
        chercher();
    }, [val])

    list.update = function(){
        updateList(Eats.fakeUpdate(list));
    }

    function chercher(){
        updateError(ErrorEats.NO_ERROR);
        list.reset();
        list.makeRequest(
            'search/'+keyword,
            {
                name: val,
                elem: elem.id_str
            },
            function(error){
            
            },
            function(response){
                console.log(response)
            }
        )
    }

    function addRelation(val){
        if(val!=""){
            updateError(ErrorEats.NO_ERROR);
            elem.makeRequest(
                baseKeyword+"/add/"+keyword, 
                {
                    access_token: Data.accessToken(),
                    value: val,
                    elem: elem.id_str
                },
                function(error){
                    updateError(ErrorEats.WENT_WRONG);
                },
                function(response){
                    if(Response.isSuccessResponse(response)){
                        let make = false;
                        let i = 0;
                        while(!make&&i<list.size()){
                            if(list.get(i).name==val){
                                list.removeIndex(i);
                                make = true;
                            }
                            i++;
                        }
                        list.update();
                        updateError(ErrorEats.SUCCESS);
                    }
                    else {
                        updateError(new ErrorEats(
                            Response.error(response)
                        ));
                    }
                }
            )
        }
    }
    function chercherEvent(e){
        updateVal(e.target.value);
        // Change la valeur du texte
    }
    function cancelEdit(){
        handleClose();
    }

    return <div>
        <div>
            <Form.Group className="mb-3">
                <Form.Control placeholder="Rechercher une compétence" value={val} onChange={chercherEvent} type="text"/>
            </Form.Group>
            <Button onClick={()=>addRelation(val)} variant="primary">Ajouter</Button>
            <Button className="ms-3" onClick={cancelEdit} variant="primary">Annuler</Button>
            {modal.getMessage(error)!=""&&<p className="mt-3 mb-0">{modal.getMessage(error)}</p>}
        </div>
        <div>
            {
                list.map(function(object, index) {
                    return <div key={index} className="d-flex mt-3">
                        <p className="mb-0">{object.name}</p> 
                        <Button onClick={()=>addRelation(object.name)} className="ms-2 mb-1 pt-1 ps-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                            <img className="img-btn" src="plus.png"/>
                        </Button>
                    </div>
                })
            }
        </div>
    </div>
}
export default AddElem;