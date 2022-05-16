import React, { useEffect, useState } from "react";
import Data from "../utils/Data";
import { Form } from "react-bootstrap";

function ListRole({project,action}){
    const [val, updateVal] = useState("");
    const [create, updateCreate] = useState(false);
    const [checked, setChecked] = useState(false);
    const [type, updateType] = useState("");

    useEffect(function(){
        project.makeRequest(
            "project/get/role",
            {
                access_token: Data.accessToken(),
                id: project.id_str
            },
            function(error){

            },
            function(response){

            }
        )
    }, []);

    function setRole(newRole){
        project.makeRequest(
            'action/user/set/role',
            {
                access_token: Data.accessToken(),
                id_project: project.id_str,
                id_user: action.user.id_str,
                id_role: newRole
            },
            function(err){
                console.log(err)
            },
            function(response){
                console.log(response)
            }
        )
    }


    let listContent;
    if(project.roleList.size()==0){
        listContent = <div>
            <p>Aucun rôle pour l'instant</p>
        </div>
    } 
    else {
        listContent = <div>
            <p>Pour l'instant {action.user.getDisplayName()} est {action.role.name}<br></br>
            Quel rôle souhaitez-vous lui attribuer au sein du projet ? </p>

            <Form.Select aria-label="Default select example"  value={type} onChange={(e) => updateType(e.target.value)}>
                <option value=""> {action.role.name}</option>

                {project.roleList.map(function(role){
                    let res;
                        if((action.role.id_str != role.id_str)){
                            res = <option 
                                value={role.id_str}>
                                {role.name}
                                </option>
                        }
                        return res;
                })}

            </Form.Select>
            
            </div>

            setRole(type);

    }
    return <div>
       
        {listContent}

    </div>
}
export default ListRole;
