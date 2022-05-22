import React, { useState, Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Constant from "../utils/Constant";
import Data from "../utils/Data";
import Field from "./Field";
import HistoryElem from "./HistoryElem";
import SelectCompetence from "./SelectCompetence";
import { Download, FiletypePdf } from "react-bootstrap-icons";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ImgProfile from "./ImgProfile";

function HistoryView({rootUser, user}){
    let [show, updateShow] = useState(false);
    let [showExport, updateShowExport] = useState(false);
    let isMember = false;

    if (user.id_str == rootUser.id_str){
        isMember=true;
    }

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
        handleClose();
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
                console.log(error)
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                console.log(response)
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
    function exportPDF(){

        let elem = document.querySelector("#exp");
        let imgProfil = document.querySelector("#imgProfil");
        console.log(imgProfil)

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFont("helvetica","bold");
        pdf.text(10,10,'Curriculum vitæ de '+ user.getDisplayName())
        pdf.setFont("helvetica","italic");
        if (user.description != undefined){
            pdf.text(10,20,""+user.description);
        }

        pdf.line(10,25,200,25)

        pdf.setFont("helvetica","normal");
        pdf.setFontSize(14);
        pdf.text(10,32,"Technologies maitrisées ");

        pdf.setFontSize(12);
        user.skillList.list.map((obj, i) => {
            if (i<7){
                pdf.text(20,40 + (i*7)," - " + obj.name);
            }else if (i < 2*7){
                pdf.text(80,40 + ((i-7)*7)," - " + obj.name);
            }else if (i < 3*7){
                pdf.text(140,40 + ((i-14)*7)," - " + obj.name);
            }
        })

        pdf.line(10,90,200,90)

        pdf.setFont("helvetica","normal");
        pdf.setFontSize(14);
        pdf.text(10,97,"Experiences professionnelles");
        
        html2canvas(imgProfil).then(canvas => {
            
            const imgDataProfil = canvas.toDataURL("image/png");
            pdf.addImage(imgDataProfil,"PNG",180,2);
        })

        html2canvas(elem).then(canvas => {
            
            const imgDataExp = canvas.toDataURL("image/png");
            pdf.addImage(imgDataExp, "PNG", 10, 100);
            pdf.save("MonCV_" + user.getDisplayName() + ".pdf");
        });

    }
    let addCv = null;
    let DL = null;
    if (isMember){
        addCv = <Button onClick={addHistory} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                </Button>;
        DL = <Button  onClick={openExport} variant="primary">
                <Download></Download>
            </Button>
    }

    return <div>
        <div className="card mt-2 ms-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex justify-content-between">
                <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                    <h4>{"Curriculum vitæ"}</h4>
                    {addCv}
                </div>
                <div className="d-flex align-items-center me-3">
                    {DL}
                    <Modal show={showExport} className="highest" onHide={closeExport}>
                        <Modal.Header closeButton>
                            <Modal.Title>Exporter mon CV</Modal.Title>
                            <div id="imgProfil" className="profil bg-light bg-light">   
                                <ImgProfile elem={user}></ImgProfile>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="d-flex justify-content-center">

                            Cette fonction permet de generer votre CV au format .pdf<br></br>
                            Nous nous basons sur vos activités présentes dans la section "Curriculum vitæ" de votre profil.<br></br>
                            Cette operation peut prendre quelques secondes.
                            
                        </Modal.Body>
                        <Modal.Footer>
                        <Button className="d-flex align-items-center m-1" variant="primary" onClick={exportPDF}>
                                Exporter
                                <FiletypePdf className="ms-2"></FiletypePdf>
                            </Button>
                            <Button variant="outline-primary" onClick={closeExport}>
                                Fermer
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div id="exp">
                {
                    user.historyList.size()!=0?
                    user.historyList.map(function(history, index){
                        return <HistoryElem history={history}>

                        </HistoryElem>
                    }):
                    (<div className="d-flex pb-2 ps-3 pe-2">
                        <p className="mb-1">
                            {
                                Data.isMe(user.id_str)
                                ?
                                "Commencez à ajouter des activités professionnelles pour vous rendre attractif pour d'autre projet."
                                :
                                "Cet utilisateur n'a aucune activité."
                            }
                        </p>
                    </div>)
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
                                project={user}
                                type = "skill">

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