import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NotifList from "../list/NotifList";
import Constant from "../utils/Constant";
import Data from "../utils/Data";
import Field from "./Field";
import SelectRole from "./SelectRole";

function ActualiteView({user, you, rootUser}){
    useEffect(function(){
        user.getHaveActuList();
    }, [])
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
        updateComment("");
        updatePrix("");
        updateRole("");
    }
    function addElem(){
        updateShow(true);
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

    const [comment, updateComment] = useState("");
    const [prix, updatePrix] = useState("");
    const [role, updateRole] = useState("");
    const [duree, updateDuree] = useState("");
    let res;

    function changeComment(e){
        updateComment(e.target.value);
    }
    function changePrix(e){
        updatePrix(e.target.value);
    }
    function changeDuree(e){
        updateDuree(e.target.value);
    }
    let action = ccAction;
    if(action.type==0){
        res = <div className="mt-3 mb-0">
            <h5>Nouveau post</h5>
            <Field className={"mt-2"} val={comment} changeValue={changeComment} label="Contenu" name="name"></Field>
        </div>
    }
    else if(action.type==1){
        res = <div className="mt-3 mb-0">
            <h5>Nouvelle offre</h5>
            <SelectRole
                updateRole={updateRole}
                project={user}>

            </SelectRole>
            <Field className={"mt-2"} val={comment} changeValue={changeComment} label="Description" name="name"></Field>
            <Field className={"mt-3"} val={prix} changeValue={changePrix} label="Prix par mois €" name="name"></Field>
            <Field className={"mt-3"} val={duree} changeValue={changeDuree} label="Durée" name="name"></Field>
        </div>
    }

    function sendElem(){
        user.makeRequest(
            '/project/create/actu', 
            {
                access_token: Data.accessToken(),
                id: user.id_str,
                role: role,
                comment: comment,
                price: prix,
                duree: duree
            },
            function(error){

            },
            function(response){
                
            }
        )
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
                {
                    user.haveActuList.map((actu, index) =>
                        <p>H,ghj</p>
                    )
                }
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
                        {res}
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