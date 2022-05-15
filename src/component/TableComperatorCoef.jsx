import React from "react";
function TableComperatorCoef({col, updateColList, colList, selectCol}){
    
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

    function onChange(e){
        let col = getCol();
        col.coef = e.target.value;
        updateColList([...colList]);
    }
    return <div>
        <label for={col.name} class="form-label">{col.name}</label>
        <input onChange={onChange} type="range" class="form-range" value={col.coef} min="0" max="5" step="1" id={col.name}/>
    </div>
}
export default TableComperatorCoef;