import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Envelope, EnvelopeFill, EyeFill, PinFill } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";
import Utils from "../utils/Utils";
import CommentRow from "./CommentRow";
function TableComperatorRow({updateSelect, select, colList, offre, index, request}){
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
    if(request.user.getTotalExp(colList[9].array)!=Utils.currentDate()){
        next = " / "+Utils.getDate(request.user.getTotalExp(colList[7].array), 1)
    }
    let classTr = "";
    if(request.accept==true){
        classTr = "accept-bg"
    }
    else if(request.refuse==true||request.refuse_user==true){
        classTr = "refuse-bg"
    }
    else if(request.pinned==true){
        classTr = "pin-bg"
    }
    return <tr className={"click "+classTr} onClick={selectThis}>
        <th scope="row">
            <input onChange={selectThis} checked={select==request.id_str} type={"checkbox"}>
            </input> 
            {
                (request.pinned&&!request.accept)&&
                <PinFill className="mb-1 ms-2">

                </PinFill>
            }
            {
                (request.invited)&&
                <EnvelopeFill className="mb-1 ms-2">

                </EnvelopeFill>
            }
        </th>
        <th scope="row">{index}</th>
        <td>{request.getScore()}</td>
        <td>{request.user.getDisplayName()}</td>
        <td>
            <div 
                className={"round-50p ps-2 pe-2 pt-1 pb-1 "+request.getStatueBackground()+" mt-1 mb-1 me-2 text-white"}>
                <p className="mb-0">{request.getStatueTitle()}</p>
                <p className="mb-0">{request.getStatueAvance()}{request.getStatueAvanceDiff()}</p>
                <p className="mb-0">{request.getStatueRetard()}{request.getStatueRetardDiff()}</p>
            </div>
        </td>
        <td>{price + " € "}{diff}</td>
        <td>
            <CommentRow request={request}>

            </CommentRow>
        </td>
        <td>{request.user.getAge() + " ans"}</td>
        <td>
            <LinearCompList
                more={true}
                request={request}
                refList={offre.compList}
                compList={request.user.skillList}>

            </LinearCompList>
        </td>
        <td>{request.user.getTotalHeure(colList[9].array) + " h" + next}</td>
    </tr>
}
export default TableComperatorRow;