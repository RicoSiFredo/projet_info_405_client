import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Data from "../utils/Data";
import Field from "./Field";
import HistoryElem from "./HistoryElem";
import ImgProfile from "./ImgProfile";

function ActuElem({action, actu, isHome=false}){
    const [show, updateShow] = useState(false);
    
    const [comment, updateComment] = useState("");
    const [heure, updateHeure] = useState(actu.heure);
    const [end, updateEnd] = useState(new Date(actu.end * 1000).toISOString().split('T')[0]);
    const [start, updateStart] = useState(new Date(actu.start * 1000).toISOString().split('T')[0]);
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
    const [prix, updatePrix] = useState(actu.price);
    function changePrix(e){
        updatePrix(e.target.value);
    }
    //const [prix, updatePrix] = useState(actu.prix);
    //const [message, updateMessage] = useState("");
    function handleSubmit(){
        actu.postuler(
            comment, 
            prix,
            heure,
            Math.ceil(new Date(start).getTime()/1000),
            Math.ceil(new Date(end).getTime()/1000),
            function(error){
                
            },
            function(result){

            }
        );
        handleClose()
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
            i += 1
        }
        if(asked){
            footer = <p className="mb-1">Vous avez déjà postulé</p>
        }
        else {
            footer = <Button onClick={postuler} className="mt-0 mb-2" variant="outline-primary">Postuler</Button>
        }
    }
    let res;
    if (!isHome){
        res = <div className={"pb-2 border-top separator pt-3 ps-3 pe-2" }>
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
    }else{ //sur le home
        res = <Link className="text-decoration-none ms-3 me-3 w-25" to={"/offre/"+actu.id_str}>
            <div className={"card bg-light bg-gradient overflow-hidden ombre p-2" }>
                <div className="d-flex justify-content-between">
                    <h3>{actu.project.name}</h3>
                    <div className="profil-tiny bg-light">
                        <ImgProfile elem={actu.project} ></ImgProfile>
                    </div>
                </div>
                
                <div>
                    <HistoryElem history={actu}>

                    </HistoryElem>
                </div>
                <div className="d-flex justify-content-center p-2">
                    {footer}
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
            </Link>
    }

    return res;
}
export default ActuElem;