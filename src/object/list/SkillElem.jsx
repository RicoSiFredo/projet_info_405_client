import {useState } from "react";
import Data from "../../utils/Data";
import Response from "../../utils/Response";
import {Button} from "react-bootstrap";

import ErrorEats from "../../object/base/ErrorEats";

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
        return <div>
        <p>{skill.name}</p>
        <Button onClick={deleteSkill} variant="primary">Supprimer la competence</Button>
    </div>
    } else {
        return <div>
            <p>{skill.name}</p>
        </div>
    }
}
export default SkillElem;