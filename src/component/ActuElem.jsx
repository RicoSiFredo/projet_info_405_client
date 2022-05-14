import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import LinearCompList from "../list/LinearCompList";
import Data from "../utils/Data";
import Field from "./Field";

function ActuElem({action, actu}){
    const [show, updateShow] = useState(false);
    
    const [comment, updateComment] = useState("");
    function changeComment(e){
        updateComment(e.target.value);
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
        <div>
            <h4>Offre d'emploi</h4>
            <Link className="text-decoration-none text-dark" to={"/offre/"+actu.id_str}>
                <Button>Voir l'annonce</Button>
            </Link>
        </div>
        <div>
            <LinearCompList
                compList={actu.compList}>

            </LinearCompList>
            <p className="mb-2">
                {"Role : " + actu.role.name}
            </p>
            <p className="mb-2">
                {"Message : " + actu.comment}
            </p>
            <p className="mb-2">
                {"Prix : " + actu.price + " €"}
            </p>
            <p className="mb-2">
                {"Durée : " + actu.duree + " j"}
            </p>
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
                <p>Choissiez votre message et le prix désiré</p>
                <Field val={comment} changeValue={changeComment} label="Message" name="message"></Field>
                <Field className={"mt-3"} val={prix} changeValue={changePrix} label="Prix €" name="price"></Field>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleSubmit}>Postuler</button>
                <button className="btn btn-outline-primary" onClick={handleClose}>Fermer</button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default ActuElem;