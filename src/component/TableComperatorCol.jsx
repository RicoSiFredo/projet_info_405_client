import { CaretDownFill } from "react-bootstrap-icons";
import React from "react";
function TableComperatorCol({col}){
    console.log(col)
    if(col!=undefined){
        let icon;
        if(col.sort){
            
        }
        return <th scope="col">
            <div>
                {col.name}
                <CaretDownFill></CaretDownFill>
            </div>
        </th>
    }
    else {
        return
    }
}
export default TableComperatorCol;