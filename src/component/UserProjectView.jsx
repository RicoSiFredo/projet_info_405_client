import { useState } from "react";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import UserProjectList from "../list/UserProjectList";
import { ActionEnum } from "../enum/ActionEnum";
import Data from "../utils/Data";
import ErrorEats from "../object/base/ErrorEats";
import Response from "../utils/Response";
import Constant from "../utils/Constant";

function UserProjectView({user, navigate}){
    const [show, updateShow] = useState(false);
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function handleClose() {
        updateShow(false);
    }
    function addElem() {
        updateVal("");
        updateError(ErrorEats.NO_ERROR);
        updateShow(true);
    }
    function createProject(){
        user.makeRequest(
            '/project/create', 
            {
                access_token: Data.accessToken(),
                name: val,
                description: ""
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG);
            },
            function(response){
                if(Response.isSuccessResponse(response)){
                    updateError(ErrorEats.SUCCESS);
                    updateShow(false);
                }
                else {
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                }
            }
        )
    }
    function handleChange(e){
        updateVal(e.target.value);
    }
    return <div>
        <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                <h4>{"Projets"}</h4>
                <Button onClick={addElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                </Button>
            </div>
            <UserProjectList 
                typeAction={[ActionEnum.IN_PROJECT]} 
                user={user} 
                navigate={navigate} 
                actionList={user.actionList}>

            </UserProjectList>
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer un projet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control placeholder="Nom" value={val} onChange={handleChange} type="text"/>
                </Form.Group>
                {error.toString()!=""&&<p className="mb-0 mt-2 ms-1">{error.toString()}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={createProject}>
                    Créer
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default UserProjectView;