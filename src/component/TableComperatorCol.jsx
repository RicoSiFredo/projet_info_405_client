import { CaretDownFill, CaretUpFill, CaretRight } from "react-bootstrap-icons";
import React from "react";
import SortEnum from "../enum/SortEnum";
function TableComperatorCol({col, updateColList, colList, selectCol}){
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
        return <th onClick={performClick} scope="col">
            <div>
                {col.name}
                {icon}
            </div>
        </th>
    }
    else {
        return
    }
}
export default TableComperatorCol;