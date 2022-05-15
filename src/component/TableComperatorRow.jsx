import React from "react";
import LinearCompList from "../list/LinearCompList";
function TableComperatorRow({offre, index, request}){
    return <tr>
        <th scope="row">{index}</th>
        <td>{request.getScore()}</td>
        <td>{request.user.getDisplayName()}</td>
        <td>
            <LinearCompList
                refList={offre.compList}
                compList={request.user.skillList}>

            </LinearCompList>
        </td>
    </tr>
}
export default TableComperatorRow;