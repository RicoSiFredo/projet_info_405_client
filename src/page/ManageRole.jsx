import ListRolePerm from "../component/ListRolePerm";
import React from "react"
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Data from "../utils/Data";
import Field from "../component/Field";
import Constant from "../utils/Constant";

function ManageRole({rootUser, project}){
    const [create, updateCreate] = useState(false);
    const [val, updateVal] = useState("");
    let isMember = false;

    {
        project.actionList.list.map((obj, index) => {
            if (obj.user.id_str == rootUser.id_str){
                isMember = true;
            }
        })
    }

    function addElem() {
        updateCreate(true);
    }

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




    if (!project.isFinish && isMember){
        return <div>
                <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-2">
                    <div className="d-flex mt-1 border-bottom mb-2 pb-2">
                        <h4>{"Role"}</h4>
                        <Button onClick={addElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                            <img className="img-btn" src={Constant.BASE_IMAGE + "plus.png"}/>
                        </Button>
                    </div>

                    <ListRolePerm project={project}>
                   
                    </ListRolePerm>

                    
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
            </div>
    }else{
        return <div>
                <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-2">
                    <div className="d-flex mt-1">
                        <h4>{"Role"}</h4>
                    </div>

                    <ListRolePerm project={project}>

                    </ListRolePerm>

                </div>
            </div>
    }
    
}
export default ManageRole;