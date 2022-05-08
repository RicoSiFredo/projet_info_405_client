import React, { useState } from "react";
import Field from "./Field";
import SelectRole from "./SelectRole";

function ActuForm({project, action}){
    const [comment, updateComment] = useState("");
    const [role, updateRole] = useState("");
    let res;

    function changeComment(e){
        updateComment(e.target.value);
    }

    if(action.type==0){
        res = <div className="mt-3 mb-0">
            <h5>Nouveau post</h5>
            <Field className={"mt-2"} val={comment} changeValue={changeComment} label="Contenu" name="name"></Field>
        </div>
    }
    else if(action.type==1){
        res = <div className="mt-3 mb-0">
            <h5>Nouvelle offre</h5>
            <SelectRole
                project={project}>

            </SelectRole>
        </div>
    }
    return res;
}
export default ActuForm;