import {useState } from "react";
import Data from "../../utils/Data";
import Response from "../../utils/Response";
import {Button} from "react-bootstrap";
import React from "react"

import ErrorEats from "../../object/base/ErrorEats";
import { BasketFill, Trash3Fill, TrashFill } from "react-bootstrap-icons";

function SkillElem({skill,user,canEdit}){

    const [val, updateVal] = useState(skill.name);
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    function deleteSkill() {
        user.makeRequest(
            "user/delete/skill", 
            {
                access_token: Data.accessToken(),
                value: val
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG);
                console.log(error)
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
            <p className="mb-0">{skill.name}</p>
            <Button onClick={deleteSkill} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                <Trash3Fill></Trash3Fill>
            </Button>
        </div>
    } else {
        return <div>
            <p>{skill.name}</p>
        </div>
    }
}
export default SkillElem;