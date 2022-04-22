import React, { useEffect,useState } from "react";
import { Button, Form } from "react-bootstrap";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";
import Data from "../utils/Data";
import Response from "../utils/Response";

function AddSkill({user,canEdit}){
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    
    useEffect(function(){
        chercher();
    }, [val])

    list.update = function(){
        updateList(Eats.fakeUpdate(list));
    }

    function chercher(){
        list.reset();
        list.makeRequest(
            '/search/skill',
            {
                name: val,
                user: user.id_str
            },
            function(error){
            
            },
            function(response){
            
            }
        )
    }

    function edit(){
        let exist = false;
        for(let i = 0; i < list.list.length; i++){
            if(list.list[i].name === val){
                exist = true;
            }
        }
        if(!exist){
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
                        //updateEdit(false);
                    }
                    else {
                        updateError(new ErrorEats(
                            Response.error(response)
                        ));
                    }
                }
            )
        }
        else {
            addRelation(val);
        }
    }

    function addRelation(name) {

        user.makeRequest(
            "user/add/skillrelation", 
            {
                access_token: Data.accessToken(),
                value: name
            },
            function(error){
                
                updateError(ErrorEats.WENT_WRONG);
            },
            function(response){
                
                if(Response.isSuccessResponse(response)){
                    //updateEdit(false);  
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
    }

    return <div>
        <div className="mb-3">
            <Form.Group className="mb-3">
                <Form.Control placeholder="Rechercher une compétence" value={val} onChange={chercherEvent} type="text"/>
            </Form.Group>
            <p>{error.toString()}</p>
            <Button onClick={edit} variant="primary">Ajouter</Button>
            <Button className="ms-3" onClick={cancelEdit} variant="primary">Annuler</Button>
        </div>
        <div>
            {
                list.map(function(object, index) {
                    return <div key={index} className="d-flex mt-2">
                        <p class="mb-0">{object.name}</p> 
                        <Button onClick={()=>addRelation(object.name)} className="ms-2 mb-1 pt-1 ps-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                            <img className="img-btn" src="plus.png"/>
                        </Button>
                    </div>
                })
            }
        </div>
    </div>
}
export default AddSkill;