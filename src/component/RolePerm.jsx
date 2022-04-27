import Data from "../utils/Data";
import React from "react"
import { ToggleButton } from "react-bootstrap";

function RolePerm({role, project}){
    return <div>
        <p>{role.name}</p>
        {
            project.permissionList.map(function(obj, index){
                function updatePerm(){
                    let have = role.havePermission(obj.enum());
                    let url;
                    if(have){
                        url = 'role/del/permission';
                    }
                    else {
                        url = 'role/add/permission';
                    }
                    project.makeRequest(
                        url,
                        {
                            access_token: Data.accessToken(),
                            id_project: project.id_str,
                            id_role: role.id_str,
                            id_permission: obj.id_str
                        },
                        function(error){

                        },
                        function(response){
                            console.log(response)
                            console.log(project)
                        }
                        
                    )
                }
                return <div key={"role-"+role.id_str+"-perm-"+obj.id_str}>
                    <label>
                        <input class="form-check-input" 
                                type="checkbox" 
                                id="flexCheckIndeterminate" 
                                onChange={updatePerm} 
                                checked={role.havePermission(obj.enum())}>    
                        </input>
                        {obj.text()}
                    </label>
                </div>
            })
        }
    </div>
}
export default RolePerm;
