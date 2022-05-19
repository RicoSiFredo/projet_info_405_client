import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Constant from "../utils/Constant";
import Data from "../utils/Data";
import Field from "./Field";
import HistoryElem from "./HistoryElem";
import SelectCompetence from "./SelectCompetence";
import { Download, FiletypePdf } from "react-bootstrap-icons";

function HistoryView({user}){
    let [show, updateShow] = useState(false);
    let [showExport, updateShowExport] = useState(false);

    function closeExport() {
        updateShowExport(false);
    }
    function openExport() {
        updateShowExport(true);
    }

    let [name, updateName] = useState("");
    let [descriptionProject, updateDescriptionProject] = useState("");

    let [role, updateRole] = useState("");
    let [description, updateDescription] = useState("");
    let [price, updatePrice] = useState("");
    let [heure, updateHeure] = useState("");
    let [start, updateStart] = useState("");
    let [end, updateEnd] = useState("");
    const [compList, updateCompList] = useState([]);

    function changeName(e){
        updateName(e.target.value);
    }
    function changeDescriptionProject(e){
        updateDescriptionProject(e.target.value);
    }
    function changeDescription(e){
        updateDescription(e.target.value);
    }
    function changePrice(e){
        updatePrice(e.target.value);
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
    function changeRole(e){
        updateRole(e.target.value);
    }
    function sendHistory(failed, success){
        let idList = []
        for(let i = 0; i < compList.length; i++){
            idList.push(compList[i].id_str);
        }
        user.makeRequest(
            "user/create/history",
            {
                access_token: Data.accessToken(),
                name: name,
                descriptionProject: descriptionProject,
                role: role,
                description: description,
                price: price,
                heure: heure,
                start: Math.ceil(new Date(start).getTime()/1000),
                end: Math.ceil(new Date(end).getTime()/1000),
                comp_list: idList
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    function addHistory(){
        updateShow(true);
    }
    function handleClose() {
        updateShow(false);
    }
    return <div>
        <div className="card mt-2 ms-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex justify-content-between">
                <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                    <h4>{"Curriculum vitæ"}</h4>
                    <Button onClick={addHistory} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                        <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                    </Button>
                </div>
                <div className="d-flex align-items-center me-3">
                    <Button  onClick={openExport} variant="primary">
                        <Download></Download>
                    </Button>
                    <Modal show={showExport} className="highest" onHide={closeExport}>
                        <Modal.Header closeButton>
                            <Modal.Title>Exporter mon CV</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="d-flex justify-content-center">

                            Cette fonction permet de generer et de telecharger un document au format .pdf. <br></br>
                            Nous nous basons sur vos activités présentes dans la section "Curriculum vitæ"
                            
                        </Modal.Body>
                        <Modal.Footer>
                        <Button className="d-flex align-items-center m-1" variant="primary">
                                Exporter
                                <FiletypePdf className="ms-2"></FiletypePdf>
                            </Button>
                            <Button variant="outline-primary" onClick={closeExport}>
                                Retour
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div>
                {
                    user.historyList.map(function(history, index){
                        return <HistoryElem history={history}>

                        </HistoryElem>
                    })
                }
            </div>
        </div>
            <Modal show={show} className="highest" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle expérience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Entreprise / Projet</h5>
                        <Field className={"mt-3"} val={name} changeValue={changeName} label="Nom" name="name"></Field>
                        <Field className={"mt-3"} val={descriptionProject} changeValue={changeDescriptionProject} label="Description" name="description"></Field>
                    </div>
                </Modal.Body>
                <Modal.Body>
                    <div>
                        <h5>Votre activité</h5>
                        <Field className={"mt-3"} val={role} changeValue={changeRole} label="Rôle" name="role"></Field>
                        <div className={"mt-3"}>
                            <SelectCompetence
                                compList={compList}
                                updateCompList={updateCompList}
                                project={user}>

                            </SelectCompetence>
                        </div>
                        <Field className={"mt-3"} val={description} changeValue={changeDescription} label="Description ( optionnel )" name="description"></Field>
                        <Field className={"mt-3"} val={heure} changeValue={changeHeure} label="Heure par semaine ( optionnel )" name="heure"></Field>
                        <Field className={"mt-3"} val={price} changeValue={changePrice} label="Salaire mois ( optionnel )" name="price"></Field>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={sendHistory}>
                        Ajouter
                    </Button>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
}
export default HistoryView;