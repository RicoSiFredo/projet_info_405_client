import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

function SelectRole({project, updateRole}){
    useEffect(function(){
        project.getAllRole();
    }, []);
    return <div key={`inline-radio`} className="mt-2">
        {
            project.roleList.map((role, index) =>
                <Form.Check
                    key={role.id_str}
                    inline
                    onChange={() => updateRole(role.id_str)}
                    label={role.name}
                    name={"select_role"}
                    type={"radio"}
                    id={`inline-radio-`+role.id_str}
                />
            )
        }
    </div>
}
export default SelectRole;