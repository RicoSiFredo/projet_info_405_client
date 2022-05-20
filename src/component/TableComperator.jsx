import { useState } from "react";
import SortEnum from "../enum/SortEnum";
import ComparatorCol from "../object/comparator/ComparatorCol";
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
function scoreSalaire(a, b){
    let res;
    if(a.getScoreSalaire()>b.getScoreSalaire()){
        res = -1;
    }
    else if(a.getScoreSalaire()<b.getScoreSalaire()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}
function scoreAge(a, b){
    let res;
    if(a.getScoreAge()>b.getScoreAge()){
        res = -1;
    }
    else if(a.getScoreAge()<b.getScoreAge()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}
function scoreStatue(a, b){
    let res;
    if(a.getScoreStatue()>b.getScoreStatue()){
        res = -1;
    }
    else if(a.getScoreStatue()<b.getScoreStatue()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}
function scoreExperience(a, b){
    let res;
    if(a.getScoreExperience()>b.getScoreExperience()){
        res = -1;
    }
    else if(a.getScoreExperience()<b.getScoreExperience()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}
function scoreCommentaire(a, b){
    let res;
    if(a.getScoreCommentaire()>b.getScoreCommentaire()){
        res = -1;
    }
    else if(a.getScoreCommentaire()<b.getScoreCommentaire()){
        res = 1;
    }
    else {
        res = 0;
    }
    return res;
}

function TableComperator({offre}){
    const [colList, updateColList] = useState([
        new ComparatorCol("#"),
        new ComparatorCol(
            "Score",
            SortEnum.ASC,
            score
        ),
        new ComparatorCol(
            "Nom"
        ),
        new ComparatorCol(
            "Status",
            SortEnum.UNDEFINED,
            scoreStatue
        ),
        new ComparatorCol(
            "Salaire",
            SortEnum.UNDEFINED,
            scoreSalaire
        ),
        new ComparatorCol(
            "Commentaire",
            SortEnum.UNDEFINED,
            scoreCommentaire
        ),
        new ComparatorCol(
            "Age",
            SortEnum.UNDEFINED,
            scoreAge
        ),
        new ComparatorCol(
            "Compétences",
            SortEnum.UNDEFINED,
            scoreComp
        ),
        new ComparatorCol(
            "Expérience",
            SortEnum.UNDEFINED,
            scoreExperience,
            true,
            []
        )
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
        list.sort(selectCol.compAsc);
    }
    else {
        list.sort(selectCol.compDesc);
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
                                    offre={offre}
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
                            request && <TableComperatorRow 
                                offre={offre} 
                                colList={colList}
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