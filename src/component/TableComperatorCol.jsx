import { CaretDownFill } from "react-bootstrap-icons";
import React from "react";
function TableComperatorCol({col}){
    console.log(col)
    return <th scope="col">
        <div>
            {"col"}
            <CaretDownFill></CaretDownFill>
        </div>
    </th>
}
export default TableComperatorCol;