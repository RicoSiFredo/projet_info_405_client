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
        updateCreate(true);
    }
    function handleClose() {
        updateCreate(false);
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
                            <br></br>
                        </div>
                    }
                })
            }
        </div>
    }
    return <div>
            <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                <h4>{"Rôles"}</h4>
                <Button onClick={startAdd} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src="plus.png"/>
                </Button>
            </div>
       
        {listContent}
        <div>
            <Modal show={create} className="highest" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Field val={val} changeValue={updateName} label="Nom" name="name"></Field>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addRole}>Ajouter</Button>
                    <Button  variant="outline-primary" onClick={handleClose}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>


    </div>
}
export default ListRolePerm;