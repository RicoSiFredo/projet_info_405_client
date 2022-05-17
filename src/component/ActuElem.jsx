import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Data from "../utils/Data";
import Field from "./Field";
import HistoryElem from "./HistoryElem";

function ActuElem({action, actu}){
    const [show, updateShow] = useState(false);
    
    const [comment, updateComment] = useState("");
    const [heure, updateHeure] = useState("");
    const [end, updateEnd] = useState("");
    const [start, updateStart] = useState("");
    function changeComment(e){
        updateComment(e.target.value);
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
    const [prix, updatePrix] = useState("");
    function changePrix(e){
        updatePrix(e.target.value);
    }
    //const [prix, updatePrix] = useState(actu.prix);
    //const [message, updateMessage] = useState("");
    function handleSubmit(){
        actu.postuler(
            comment, 
            prix,
            function(error){
                
            },
            function(result){

            }
        );
    }
    function handleClose() {
        updateShow(false);
    }
    function postuler() {
        updateShow(true);
    }
    let footer;
    if(action.type == 0){
        footer = <p className="mb-1">Vous posser déjà un rôle.</p>
    }
    else {
        let asked = false;
        let i = 0
        while(!asked&&i<actu.requestList.size()){
            if(actu.requestList.get(i).user.id_str == Data.getUserId()){
                asked = true;
            }
        }
        if(asked){
            footer = <p>Vous avez déjà postulé</p>
        }
        else {
            footer = <Button onClick={postuler} className="mt-0 mb-2" variant="primary">Postuler</Button>
        }
    }
    return <div className={"pb-2 border-top separator pt-3 ps-3 pe-2" }>
        <div className="d-flex justify-content-between">
            <h4>Offre d'emploi</h4>
            <Link className="me-2 float-end text-decoration-none text-dark" to={"/offre/"+actu.id_str}>
                <Button>Voir l'annonce</Button>
            </Link>
        </div>
        <div>
            <HistoryElem history={actu}>

            </HistoryElem>
        </div>
        <div>
            {
                footer
            }
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Postuler pour cette offre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-2">Choissiez votre message présenté au recruteur</p>
                <Field val={comment} changeValue={changeComment} label="Message" name="message"></Field>
                <p className="mt-3 mb-2">Suggérer une modification ( optionnel )</p>
                <Field className={"mt-1"} val={heure} changeValue={changeHeure} label="Heure par semaine" name="heure"></Field>
                <Field className={"mt-3"} val={prix} changeValue={changePrix} label="Salaire mois" name="price"></Field>
                <Row className={"mt-3"}>
                <Col>
                    <Form.Group>
                        <Form.Label>Début</Form.Label>
                        <Form.Control type="date" value={start} onChange={changeStart} name="start" placeholder="Debut" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Fin</Form.Label>
                        <Form.Control type="date" value={end} onChange={changeEnd} name="end" placeholder="Fin" />
                    </Form.Group>
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleSubmit}>Postuler</button>
                <button className="btn btn-outline-primary" onClick={handleClose}>Fermer</button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default ActuElem;