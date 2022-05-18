import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import LinearCompList from "../list/LinearCompList";
function TableComperatorRow({offre, index, request}){

    const [show, updateShow] = useState(false);
    function handleClose() {
        updateShow(false);
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