import { useState } from "react";
import SortEnum from "../enum/SortEnum";
import TableComperatorCoef from "./TableComperatorCoef";
import TableComperatorCol from "./TableComperatorCol";
import TableComperatorRow from "./TableComperatorRow";

function score(a, b){
    let res;
    if(a.getScore()>b.getScore()){
        res = -1;
    }
    else if(a.getScore()<b.getScore()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}
function scoreComp(a, b){
    let res;
    if(a.getScoreComp()>b.getScoreComp()){
        res = -1;
    }
    else if(a.getScoreComp()<b.getScoreComp()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}

function TableComperator({offre}){
    const [colList, updateColList] = useState([
        {
            name: "#",
            sort: SortEnum.CANT
        },
        {
            name: "Score",
            sort: SortEnum.ASC,
            fun_asc: function(a, b){
                return score(a, b) * 1;
            },
            fun_desc: function(a, b){
                return score(a, b) * -1;
            }
        },
        {
            name: "Nom",
            sort: SortEnum.CANT
        },
        {
            name: "Compétences",
            sort: SortEnum.UNDEFINED,
            fun_asc: function(a, b){
                return scoreComp(a, b) * 1;
            },
            fun_desc: function(a, b){
                return scoreComp(a, b) * -1;
            },
            coef: 1
        }
    ]);

    let selectCol;
    for(let i = 0; i < colList.length; i++){
        if(colList[i].sort!=SortEnum.CANT&&
        colList[i].sort!=SortEnum.UNDEFINED){
            selectCol = colList[i];
        }
    }
    let list = []
    for (let i = 0; i < offre.requestList.size(); i++){
        let request = offre.requestList.get(i);
        request.colList = colList;
        list.push(request)
    }
    if(selectCol.sort==SortEnum.ASC){
        list.sort(selectCol.fun_asc);
    }
    else {
        list.sort(selectCol.fun_desc);
    }
    return <div className="d-flex">
        <div className="w-25">
            {
                colList.map((col, index) =>
                    ( col.sort!=SortEnum.CANT &&
                    col.name!="Score" ) && <TableComperatorCoef
                        updateColList={updateColList}
                        colList={colList}
                        col={col}>

                    </TableComperatorCoef>
                )
            }
        </div>
        <div className="w-75">
            <table class="table table-striped">
                <thead>
                    <tr>
                        {
                            colList.map((col, index) =>
                                <TableComperatorCol
                                    updateColList={updateColList}
                                    colList={colList}
                                    col={col}>

                                </TableComperatorCol>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((request, index) =>
                            <TableComperatorRow 
                                offre={offre} 
                                index={index+1} 
                                request={request}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>
}
export default TableComperator;