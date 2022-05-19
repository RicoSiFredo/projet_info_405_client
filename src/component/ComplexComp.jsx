import { Button, Modal } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";
import Utils from "../utils/Utils";
import CvElemView from "./CvElemView";
function ComplexComp({compList, request, updateSelected, openned, comp, getBackground, getInverseBackground}){
    let icon;
    if(!openned){
        icon = <CaretRightFill className="text-white mb-1 me-1"></CaretRightFill>;
    }
    else {
        icon = <CaretDownFill className="text-white me-1 mb-1"></CaretDownFill>;
    }
    function open(){
        if(!openned){
            updateSelected(comp.id_str);
        }
        else {
            updateSelected("");
        }
    }
    const [show, updateShow] = useState(false);
    function handleClose(){
        updateShow(false);
    }
    let contentExp;
    let firstExp = request.user.getFirstExp(comp);
    if(firstExp==Utils.currentDate()){
        contentExp = <div className="ms-1 mb-1">
            <span className="text-white">Cet utilisateur possède cette compétence mais ne l'a pas utilisée dans sa carrière professionnelle.</span>
        </div>
    }
    else {
        function plus(e){
            e.stopPropagation();
            updateShow(true);
        }
        let lastExp = request.user.getLastExp(comp);
        let duringExp = request.user.getDuringExp(comp);
        contentExp = <div className="ms-1 mb-2">
            <p className="text-white mb-1">Première experience: {Utils.getDate(firstExp, 1, "il y a ")}</p>
            <p className="text-white mb-1">Dernière experience: {Utils.getDate(lastExp, 1, "il y a ")}</p>
            <p className="text-white mb-2">Expérience total: {Utils.getDate(Utils.currentDate() - duringExp, 1)}</p>
            <span onClick={plus} className={getInverseBackground(comp)+" round-50p text-white mt-1 ps-3 pe-3 pt-1 pb-1"}>
                Voir plus
            </span>
        </div>
    }
    let list = [];
    if (show&&openned) {
        for(let i=0; i<request.user.cvList.size(); i++){
            let cv = request.user.cvList.get(i);
            if(cv.have(comp)){
                list.push(cv);
            }
        }
    }
    function getTotalExp(){
        let duree = 0;
        for(let i=0; i<list.length; i++){
            let cv = list[i];
            duree += cv.getDuree();
        }
        return Utils.getDate(Utils.currentDate() - duree, 1);
    }
    function getTotalHeure(){
        let heure = 0;
        for(let i=0; i<list.length; i++){
            let cv = list[i];
            heure += cv.getTotalHeure();
        }
        return heure
    }
    return <div>
        <div 
            onClick={()=>{open()}}
            key={comp.id_str} 
            className={"round-50p ps-2 pe-3 pt-1 pb-1 "+getBackground(comp)+" mt-1 mb-1 me-2"}>
            
            {icon}
            <span className="text-white">{comp.name}</span>
            {openned&&contentExp}
            
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Liste des activités professionnelle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="pb-2">
                        <h5>Compétence {comp.name}</h5>
                        <h5 className="mb-1">Expérience : {getTotalHeure()} h / {getTotalExp()}</h5>
                    </div>
                    {
                        list.map((cvElem, index)=>
                            <CvElemView
                                user={request.user}
                                cvElem={cvElem}>
                                
                            </CvElemView>
                        )
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>

    /*
    <div>
            <p className="text-white">Première experience: 15/07/2017</p>
            <p className="text-white">Dernière experience: Aujourd'hui</p>
            <p className="text-white">Experience total: + 3 Semaine</p>
            <p className="text-white">Voir plus</p>
        </div>} */
}
export default ComplexComp;