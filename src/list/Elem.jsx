import {useState } from "react";
import Data from "../utils/Data";
import Response from "../utils/Response";
import {Button} from "react-bootstrap";
import React from "react"
import ErrorEats from "../object/base/ErrorEats";
import { Trash3Fill } from "react-bootstrap-icons";
import Project from "../object/Project";

function Elem({elem,parent,keyword,canEdit}){

    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    let baseKeyword = "user"
    if(parent instanceof Project){
        baseKeyword = "project"
    }

    function deleteElem() {
        parent.makeRequest(
            baseKeyword+"/delete/"+keyword, 
            {
                access_token: Data.accessToken(),
                elem_del: elem.id_str,
                elem: parent.id_str
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG);
            },
            function(response){
                if(Response.isSuccessResponse(response)){

                }
                else {
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                }
            }
        )
       
    }

    if(canEdit) {
        return <div className="d-flex mt-2">
            <p className="mb-0">{elem.name}</p>
            <Button onClick={deleteElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                <Trash3Fill></Trash3Fill>
            </Button>
        </div>
    } else {
        return <div>
            <p>{elem.name}</p>
        </div>
    }
}
export default Elem;