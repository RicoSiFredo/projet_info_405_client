import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

function SelectRole({project}){
    useEffect(function(){
        project.getAllRole();
    }, []);
    return <div>
        {
            project.roleList.map((role, index) =>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label={role.name} />
                </Form.Group>
            )
        }
    </div>
}
export default SelectRole;