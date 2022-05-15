import React, { useEffect, useState } from "react";
import Data from "../utils/Data";
import Field from "./Field";
import RolePerm from "./RolePerm";
import { Button, Modal } from "react-bootstrap";

function ListRole({project}){
    const [val, updateVal] = useState("");
    const [create, updateCreate] = useState(false);
    const [checked, setChecked] = useState(false);

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


    let listContent;
    if(project.roleList.size()==0){
        listContent = <div>
            <p>Aucun rôle pour l'instant</p>
        </div>
    } 
    else {
        listContent = 
        <div>
            <form>
                <div className="d-flex row p-1">
 
                        {project.roleList.map((object) => (
                
                        <div>
                            <input 
                                type="radio" 
                                id={object.id_str} 
                                value={object.id_str} 
                                name={object.name} 
                            />
                            <label 
                                for={object.id_str} 
                                className="mb-1">
                                {object.name}
                            </label>
                        </div>

                        ))}
                    
                </div>
           </form>
        </div>
    }
    return <div>
       
        {listContent}

    </div>
}
export default ListRole;

