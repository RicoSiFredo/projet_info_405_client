import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Data from "../utils/Data";
import Field from "./Field";
import RolePerm from "./RolePerm";

function ListRolePerm({project}){
    const [val, updateVal] = useState("");
    const [create, updateCreate] = useState(false);

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

    function addRole(){
        project.makeRequest(
            "project/add/role",
            {
                access_token: Data.accessToken(),
                id_project: project.id_str,
                name: val
            },
            function(error){

            },
            function(response){
                updateVal("")
                updateCreate(false)
            }
        )
    }

    function updateName(e){
        updateVal(e.target.value);
    }
    function startAdd(){
        updateCreate(!create);
    }

    let add;
    if(!create){
        add = <Button onClick={startAdd}>Ajouter un role</Button>
    } else {
        add = <div>
            <p>Ajouter un role :</p>
            <Field val={val} changeValue={updateName} label="Nom" name="name"></Field>
            <Button onClick={addRole}>Ajouter</Button><Button onClick={startAdd}>Annuler</Button>
        </div>
    }
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
                        </div>
                    }
                })
            }
        </div>
    }
    return <div>
        {add}
        {listContent}
    </div>
}
export default ListRolePerm;