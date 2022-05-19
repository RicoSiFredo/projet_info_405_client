import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import LinearCompList from "../list/LinearCompList";
function TableComperatorRow({offre, index, request}){

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
    return <tr>
        <th scope="row">{index}</th>
        <td>{request.getScore()}</td>
        <td>
            <div 
                className={"round-50p d-inline ps-2 pe-2 pt-1 pb-1 "+request.getStatueBackground()+" mt-1 mb-1 me-2 text-white"}>
                {request.getStatueTitle()}
            </div>
        </td>
        <td>{request.user.getDisplayName()}</td>
        <td>{price + " € "}{diff}</td>
        <td>{request.user.getAge() + " ans"}</td>
        <td>
            <LinearCompList
                more={true}
                request={request}
                refList={offre.compList}
                compList={request.user.skillList}>

            </LinearCompList>
        </td>
        <td>{request.user.getTotalHeure() + " h"}</td>
    </tr>
}
export default TableComperatorRow;