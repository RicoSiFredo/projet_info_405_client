import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EyeFill, PinFill } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";
import Utils from "../utils/Utils";
import CommentRow from "./CommentRow";
function TableComperatorRowUser({updateSelect, select, colList, offre, index, request}){
    const [show, updateShow] = useState(false);
    function handleClose() {
        updateShow(false);
    }
    let diff = "";
    let price = request.price;
    if(request.price==undefined){
        price = offre.price
    }
    if(offre.price!=price){
        if(offre.price>price){
            diff = <span className="text-success">(- {offre.price-price} €)</span>
        }
        else {
            diff = <span className="text-danger">(+ {price-offre.price} €)</span>
        }
    }
    function selectThis(e){
        e.stopPropagation()
        if(select==request.id_str){
            updateSelect("");
        }
        else {
            updateSelect(request.id_str);
        }
    }
    let next = "";
    /*if(request.user.getTotalExp(colList[9].array)!=Utils.currentDate()){
        next = " / "+Utils.getDate(request.user.getTotalExp(colList[7].array), 1)
    }*/
    let classTr = "";
    if(request.accept==true){
        classTr = "accept-bg"
    }
    else if(request.refuse==true||request.refuse_user==true){
        classTr = "refuse-bg"
    }
    else if(request.pinned_user==true){
        classTr = "pin-bg"
    }
    function getPrice(){
        if(request.price!=undefined&&request.price!=''&&request.price!=0){
            return parseInt(request.price)
        }
        else {
            return parseInt(request.actu.price)
        }
    }
    function getHeure(){
        if(request.heure!=undefined&&request.heure!=''&&request.heure!=0){
            return request.heure
        }
        else {
            return request.actu.heure
        }
    }
    function getStart(){
        if(request.start!=undefined&&request.start!=''&&request.start!=0){
            return request.start
        }
        else {
            return request.actu.start
        }
    }
    function getEnd(){
        if(request.end!=undefined&&request.end!=''&&request.end!=0){
            return request.end
        }
        else {
            return request.actu.end
        }
    }
    function getDuree(){
        let start = getStart();
        let end = getEnd();
        if(end==undefined||end==''||end==0){
            return "A partir du "+Utils.getDate(start, 0)
        }
        else {
            return "Du "+Utils.getDate(start, 0)+" au "+Utils.getDate(end, 0)
        }
    }
    return <tr className={"click "+classTr} onClick={selectThis}>
        <th scope="row">
            <input onChange={selectThis} checked={select==request.id_str} type={"checkbox"}>
            </input> 
            {
                (request.pinned_user&&!request.accept)&&
                <PinFill className="mb-1 ms-2">

                </PinFill>
            }
        </th>
        <th scope="row">{index}</th>
        <td>{request.getScoreUser()}</td>
        <td>{request.actu.project.name}</td>
        <td>{getPrice() + " €"}</td>
        <td>{getHeure() + " h"}</td>
        <td>{getDuree()}</td>
        <td>
            <LinearCompList
                refList={offre.skillList}
                compList={request.actu.compList}>

            </LinearCompList>
        </td>
        <td>
            {request.getTaille()}
        </td>
        <td></td>
    </tr>
}
export default TableComperatorRowUser;