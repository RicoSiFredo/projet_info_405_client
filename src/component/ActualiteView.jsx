import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NotifList from "../list/NotifList";
import Constant from "../utils/Constant";
import ActuForm from "./ActuForm";

function ActualiteView({user, you, rootUser}){
    let [show, updateShow] = useState(false);
    let [listAction, updateListAction] = useState([{
        type: 0,
        title: "Post",
        color: "warning",
        select: true
    }, {
        type: 1,
        title: "Offre",
        color: "danger",
        select: false
    }]); 
    let ccAction;
    for(let i = 0; i < listAction.length; i++){
        if(listAction[i].select){
            ccAction = listAction[i];
        }
    }
    function handleClose() {
        updateShow(false);
    }
    function addElem(){
        updateShow(true);
    }
    function sendElem(){

    }
    function selectAction(action){
        for(let i = 0; i < listAction.length; i++){
            listAction[i].select = false;
        }
        for(let i = 0; i < listAction.length; i++){
            if(listAction[i].title==action.title){
                listAction[i].select = true;
            }
        }
        updateListAction([...listAction]);
    }
    return (
        <div>
            <div className="card mt-2 ms-2 me-2 bg-light bg-gradient overflow-hidden">
                <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                    <h4>{"Actualités"}</h4>
                    <Button onClick={addElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                        <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                    </Button>
                </div>
                <NotifList
                    rootUser={rootUser}
                    user={user}
                    you={false}
                    list={user.notifList}>

                </NotifList>
            </div>
            <Modal show={show} className="highest" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle actualité</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {listAction.map((action, index) => 
                            <Button onClick={()=>selectAction(action)} className="me-2" variant={ action.select ? action.color : "outline-"+action.color }>{action.title}</Button>
                        )}
                    </div>
                    <div>
                       <ActuForm
                            project={user} 
                            action={ccAction}>

                        </ActuForm>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={sendElem}>
                        Valider
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ActualiteView;