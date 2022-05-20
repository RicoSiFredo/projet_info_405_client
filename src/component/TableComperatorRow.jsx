import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";
import Utils from "../utils/Utils";
import CommentRow from "./CommentRow";
function TableComperatorRow({colList, offre, index, request}){
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
    let next = "";
    if(request.user.getTotalExp(colList[8].array)!=Utils.currentDate()){
        next = " / "+Utils.getDate(request.user.getTotalExp(colList[7].array), 1)
    }
    return <tr>
        <th scope="row">{index}</th>
        <td>{request.getScore()}</td>
        <td>{request.user.getDisplayName()}</td>
        <td>
            <div 
                className={"round-50p d-inline ps-2 pe-2 pt-1 pb-1 "+request.getStatueBackground()+" mt-1 mb-1 me-2 text-white"}>
                {request.getStatueTitle()}
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
        <td>{request.user.getTotalHeure(colList[8].array) + " h" + next}</td>
    </tr>
}
export default TableComperatorRow;