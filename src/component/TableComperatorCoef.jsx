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
        if(e.target.value>5){
            col.coef = 5;
        }
        else {
            col.coef = e.target.value;
        }
        updateColList([...colList]);
    }
    return <div className={"border-bottom-sep pb-3 mb-3"}>
        <h5>
            <label for={col.name} className="form-label">{col.name}</label>
        </h5>
        <div className="d-flex justify-content-end">
            <input onChange={onChange} type="range" className="form-range mt-2 me-2" value={col.coef} min="0" max="5" step="1" id={col.name}/>
            <input onChange={onChange} type="number" className="form-control h-38px width-input" value={col.coef} id={col.name+"2"}/>
        </div>
    </div>
}
export default TableComperatorCoef;