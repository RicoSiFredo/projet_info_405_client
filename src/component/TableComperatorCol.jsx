import { CaretDownFill, CaretUpFill, CaretRight, FilterSquareFill, FilterSquare } from "react-bootstrap-icons";
import React from "react";
import SortEnum from "../enum/SortEnum";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
function TableComperatorCol({offre, col, updateColList, colList, selectCol}){
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
        function performClick(){
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
        function selectFileter(){
            updateShow(true)
        }
        function handleClose(){
            updateShow(false)
        }
        function updateComp(id){
            let col = getCol();
            if(col.array.includes(id)){
                col.array = col.array.filter(item => item!=id);
                updateColList([...colList])
            }
            else{
                col.array.push(id);
                updateColList([...colList])
            }
            //updateColList([...colList]);
        }
        function updateAll(){
            let col = getCol();
            col.array = [];
            updateColList([...colList]);
        }
        let selectAll = col.array!=undefined && col.array.length == 0;
        return <th onClick={performClick} scope="col">
            <div>
                {
                    col.fileter&&
                    <Button onClick={selectFileter} variant="primary" className="pt-0 pb-1 pe-1 ps-1 me-2">
                        <FilterSquareFill className="text-white"></FilterSquareFill>
                    </Button>
                }
                {col.name}
                {icon}
            </div>
            <div>
                <Modal show={show} className="highest" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un role</Modal.Title>
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
                            offre.compList.map((comp, i)=>
                                <div key={"comp_"+i}>
                                    <label>
                                        <input type="checkbox" checked={col.array!=undefined&&col.array.includes(comp.id_str)} onChange={()=>updateComp(comp.id_str)} name={"comp_checkbox_"+comp.id_str}>
                                        </input>
                                        {" "+comp.name}
                                    </label>
                                </div>
                            )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={updateComp}>Fermer</Button>
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