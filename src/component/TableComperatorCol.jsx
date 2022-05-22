import { CaretDownFill, CaretUpFill, CaretRight, FilterSquareFill, FilterSquare, TrashFill, ListStars, QuestionCircle } from "react-bootstrap-icons";
import React from "react";
import SortEnum from "../enum/SortEnum";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import User from "../object/User";
import ListEats from "../object/base/ListEats";
const mark = {
    "name": ["Score", "Status", "Salaire", "Commentaire", "Compétences", "Expérience"]
}
function TableComperatorCol({offre, col, updateColList, colList, selectCol}){
    const [showHint, updateShowHint] = useState(false)
    function openHint(e){
        e.stopPropagation();
        updateShowHint(true)
    }
    function handleCloseHint(e){
        updateShowHint(false)
    }
    const [show, updateShow] = useState(false)
    if(col!=undefined){
        let icon;
        if(col.sort==SortEnum.DESC){
            icon = <CaretUpFill></CaretUpFill>;
        }
        else if(col.sort==SortEnum.ASC){
            icon = <CaretDownFill></CaretDownFill>;
        }
        else if(col.sort==SortEnum.UNDEFINED){
            icon = <CaretRight></CaretRight>;
        }
        function getCol(){
            let resCol = undefined;
            let i = 0;
            while(resCol==undefined&&i < colList.length){
                if(colList[i].name==col.name){
                    resCol = colList[i];
                }
                i++;
            }
            return resCol;
        }
        function performClick(e){
            let col = getCol();
            if(col.sort!=SortEnum.CANT){
                if(col.sort==SortEnum.UNDEFINED){
                    for(let i = 0; i < colList.length; i++){
                        if(SortEnum.CANT!=colList[i].sort){
                            colList[i].sort = SortEnum.UNDEFINED;
                        }
                    }
                    col.sort = SortEnum.ASC;
                }
                else if(col.sort==SortEnum.ASC){
                    col.sort = SortEnum.DESC;
                }
                else if(col.sort==SortEnum.DESC){
                    col.sort = SortEnum.ASC;
                }
                updateColList([...colList]);
            }
        }
        function deleteFileter(e){
            e.stopPropagation();
            let col = getCol();
            col.array = [];
            updateColList([...colList]);
        }
        function selectFileter(e){
            e.stopPropagation();
            updateShow(true)
        }
        function handleClose(e){
            updateShow(false)
        }
        function updateComp(comp){
            let col = getCol();
            if(col.array.includes(comp)){
                col.array = col.array.filter(item => !item.equals(comp));
                updateColList([...colList])
            }
            else{
                col.array.push(comp);
                updateColList([...colList])
            }
        }
        function updateAll(){
            let col = getCol();
            col.array = [];
            updateColList([...colList]);
        }
        let compList;
        if(offre instanceof User){
            compList = offre.skillList
        }
        else {
            compList = offre.compList
        }
        let selectAll = col.array != undefined && col.array.length == 0;
        return <th scope="col">
            <div className={col.sort!=SortEnum.CANT&&"click"} onClick={performClick} >
                {
                    col.fileter&&
                    <Button onClick={(e)=>selectFileter(e)} variant="primary" className="pt-0 pb-1 pe-1 ps-1 me-2">
                        <ListStars className="text-white"></ListStars>
                    </Button>
                }
                {col.name}
                {col.hint&&
                    <QuestionCircle onClick={openHint} className="ms-1 click me-1">
                    </QuestionCircle>
                }
                {icon}
                {
                    (col.fileter&&col.array.length!=0)&&
                    <Button onClick={(e)=>deleteFileter(e)} variant="danger" className="pt-0 pb-1 pe-1 ps-1 ms-2">
                        <TrashFill className="text-white"></TrashFill>
                    </Button>
                }
            </div>
            <div>
                <Modal show={show} className="highest" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un filtre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Appliquer le calcule uniquement sur les compétences</h5>
                        {
                            <label>
                                <input type="checkbox" name="comp_checkbox_tout" checked={selectAll} onChange={updateAll}>
                                </input>
                                {" Toutes les compétences"}
                            </label>
                        }
                        {
                            compList.map((comp, i)=>
                                <div key={"comp_"+i}>
                                    <label>
                                        <input type="checkbox" checked={col.array!=undefined&&col.array.includes(comp)} onChange={()=>updateComp(comp)} name={"comp_checkbox_"+comp.id_str}>
                                        </input>
                                        {" "+comp.name}
                                    </label>
                                </div>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
            <div>
                <Modal show={showHint} className="highest" onHide={handleCloseHint}>
                    <Modal.Header closeButton>
                        <Modal.Title>{col.hintTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mb-0">{col.hintDescription}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleCloseHint}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </th>
    }
    else {
        return
    }
}
export default TableComperatorCol;