import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import NotifList from "../list/NotifList";
import Constant from "../utils/Constant";
import Data from "../utils/Data";
import ActuElem from "./ActuElem";
import Field from "./Field";
import SelectCompetence from "./SelectCompetence";
import SelectRole from "./SelectRole";

function ActualiteView({user, you, rootUser}){
    let [show, updateShow] = useState(false);
    let [listAction, updateListAction] = useState([{
        type: 0,
        title: "Post",
        color: "warning",
        select: false
    }, {
        type: 1,
        title: "Offre",
        color: "danger",
        select: true
    }]); 
    let isMember = false;
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
    const [heure, updateHeure] = useState("");
    const [end, updateEnd] = useState("");
    const [start, updateStart] = useState("");
    const [compList, updateCompList] = useState([]);

    let res;

    function changeComment(e){
        updateComment(e.target.value);
    }
    function changePrix(e){
        updatePrix(e.target.value);
    }
    function changeHeure(e){
        updateHeure(e.target.value);
    }
    function changeStart(e){
        updateStart(e.target.value);
    }
    function changeEnd(e){
        updateEnd(e.target.value);
    }
    let action = ccAction;
    if(action.type==0){
        res = <div className="mt-3 mb-0">
            <h5>Nouveau post</h5>
            <Field className={"mt-2"} val={comment} changeValue={changeComment} label="Contenu" name="name"></Field>
        </div>
    }
    else if(action.type==1){
        res = <div className="mb-0">
            <h5>Nouvelle offre</h5>
            <SelectCompetence
                compList={compList}
                updateCompList={updateCompList}
                project={user}
                type = "skill">

            </SelectCompetence>
            <SelectRole
                updateRole={updateRole}
                project={user}>

            </SelectRole>
            <Field className={"mt-2"} val={comment} changeValue={changeComment} label="Description ( optionnel )" name="name"></Field>
            <Field className={"mt-3"} val={heure} changeValue={changeHeure} label="Heure par semaine ( optionnel )" name="name"></Field>
            <Field className={"mt-3"} val={prix} changeValue={changePrix} label="Salaire mois ( optionnel )" name="name"></Field>
            <Row className={"mt-3"}>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Début</Form.Label>
                        <Form.Control type="date" value={start} onChange={changeStart} name="start" placeholder="Debut" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Fin</Form.Label>
                        <Form.Control type="date" value={end} onChange={changeEnd} name="end" placeholder="Fin" />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    }

    function sendElem(){
        let idList = []
        for(let i = 0; i < compList.length; i++){
            idList.push(compList[i].id_str);
        }
        user.makeRequest(
            '/project/create/actu', 
            {
                access_token: Data.accessToken(),
                id: user.id_str,
                description: comment,
                price: prix,
                heure: heure,
                start: Math.ceil(new Date(start).getTime()/1000),
                end: Math.ceil(new Date(end).getTime()/1000),
                role: role,
                comp_list: idList
            },
            function(error){
                console.log(error)
            },
            function(response){
                console.log(response)
            }
        )
        handleClose();
    }
    /*
    <div>
        {listAction.map((action, index) => 
            <Button onClick={()=>selectAction(action)} className="me-2" variant={ action.select ? action.color : "outline-"+action.color }>{action.title}</Button>
        )}
    </div>
    */
    {
        user.actionList.list.map((obj, index) => {
            if (obj.user.id_str == rootUser.id_str){
                isMember = true;
            }
        })
    }
    if (!user.isFinish && isMember){
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
                        user.haveActuList.size()==0
                        ?
                        <div className="d-flex ps-3 pe-2">
                            <p>Ce projet ne présente aucunes actualités</p>
                        </div>
                        :
                        user.haveActuList.map((actu, index) =>
                            <ActuElem
                                action={user.action}
                                actu={actu}>
    
                            </ActuElem>
                        )
                    }
                </div>
                <Modal show={show} className="highest" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nouvelle actualité</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {res}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={sendElem}>
                            Envoyer
                        </Button>
                        <Button variant="outline-primary" onClick={handleClose}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }else{
        return (
            <div>
                <div className="card mt-2 ms-2 me-2 bg-light bg-gradient overflow-hidden">
                    <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                        <h4>{"Actualités"}</h4>
                    </div>
                    {
                        user.haveActuList.map((actu, index) =>
                            <ActuElem
                                action={user.action}
                                actu={actu}>
    
                            </ActuElem>
                        )
                    }
                </div>
            </div>
        )
    }
    
}
export default ActualiteView;