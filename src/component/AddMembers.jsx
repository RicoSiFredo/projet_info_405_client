import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Field from "../component/Field";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import ProjectUserCheckList from "../list/ProjectUserCheckList";
import Data from "../utils/Data";
import React from "react";
import { Search } from "react-bootstrap-icons";
import ErrorEats from "../object/base/ErrorEats";

function AddMembers({project}){
    const [name, updateName] = useState("");
    const [loading, updateLoading] = useState(false);
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC), "User"));

    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    const [show, updateShow] = useState(false);
    const [elem, updateElem] = useState(undefined);

    function inviteElem(elem){
        updateElem(elem);
        updateError(ErrorEats.NO_ERROR);
        updateShow(true);
    }
    function handleClose(){
        updateShow(false);
    }

    useEffect(function(){
        chercher();
    }, [name])

    let url = '/project/add/user/search';
    let param = {
        "id_project": project.id_str
    };

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercherEvent(e){
        updateName(e.target.value);
    }
    function chercher(){
        updateLoading(true);
        list.reset();
        param.name = name;
        param.access_token = Data.accessToken();
        list.makeRequest(
            url, 
            param,
            function(error){
                updateLoading(false);
            },
            function(response){
                updateLoading(false);
            }
        )
    }
    const customStyles = {
        content : {
        },
        overlay: {zIndex: 1200}
    };
    return <div>
        <div className="d-flex justify-content-end">
            <Field name={"name"} label="Nom" val={name} changeValue={chercherEvent} className="flex-1"></Field>
            
            <button onClick={chercher} type="button" className="height-38 ms-3 d-flex align-items-center justify-content-center btn btn-primary">
                <Search></Search>
            </button>
        </div>
        <div>
            <ProjectUserCheckList loading={loading} project={project} inviteElem={inviteElem} listElem={list}>
            </ProjectUserCheckList>
        </div>
        <Modal backdropClassName={"modal-z-2"} style={customStyles} show={show} className="highest modal-z-2" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Inviter {elem != undefined && elem.firstname + " " + elem.lastname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>dfd</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={""}>
                    Inviter
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default AddMembers;