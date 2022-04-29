import React, { useEffect, useState } from "react";
import Data from "../utils/Data";
import Field from "./Field";
import RolePerm from "./RolePerm";
import { Button, Modal } from "react-bootstrap";

function ListRolePerm({project}){
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
            <p>Aucun rôle, vous devez en ajouter un</p>
        </div>
    } 
    else {
        listContent = <div>
            {
                project.roleList.map(function(object, index){
                    if(object.root==undefined){
                        return <div key={object.id_str}>
                            <RolePerm project={project} role={object}></RolePerm>
                            <br></br>
                        </div>
                    }
                })
            }
        </div>
    }
    return <div>
       
        {listContent}

    </div>
}
export default ListRolePerm;