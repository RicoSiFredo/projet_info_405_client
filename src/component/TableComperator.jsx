import { Button } from "react-bootstrap";
import { useState } from "react";
import SortEnum from "../enum/SortEnum";
import ComparatorCol from "../object/comparator/ComparatorCol";
import ImgProfile from "./ImgProfile";
import TableComperatorCoef from "./TableComperatorCoef";
import TableComperatorCol from "./TableComperatorCol";
import TableComperatorRow from "./TableComperatorRow";
import { TrashFill } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";

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
        new ComparatorCol(""),
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
    const [select, updateSelect] = useState("")
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
    let selectRequest = undefined;
    for(let i = 0; i < offre.requestList.size(); i++){
        let request = offre.requestList.get(i);
        if(request.id_str==select){
            selectRequest = request;
        }
    }
    function startConv(){
        selectRequest.startConv(offre);
    }
    console.log(offre.action.user)
    return <div className="d-flex  h-100 ">
        <div className="w-25 h-100 border-right-comapretor">
            <div className="p-3 bg-light border-bottom-comapretor">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <h2>{"Offre"}</h2>
                        <Button variant="danger" className="pt-0 pb-1 pe-3 ps-3 ms-2">
                            <TrashFill className="text-white"></TrashFill>
                        </Button>
                    </div>
                    {offre.action.user!=undefined&&
                    <div className="d-flex ps-1 pe-2 border border-dark rounded  pt-1">
                        <div className="justify-content-center align-items-center profil-tinylow bg-light bg-light">
                            <ImgProfile elem={offre.action.user}></ImgProfile>
                        </div>
                        <div className="d-flex ms-2 mb-0 justify-content-center align-items-center">
                            <h6>{offre.action.user.getDisplayName()}</h6>
                        </div>
                    </div>
}
                </div>
                <div>
                    <p className="mt-2">{offre.description}</p>
                    <LinearCompList
                        compList={offre.compList}>

                    </LinearCompList>
                    <Button variant="primary" className="mt-3">
                        Inviter    
                    </Button>
                </div>
                
            </div>
            {(selectRequest!=undefined)&&
                <div className="p-3 bg-light border-bottom-comapretor">
                    <div className="d-flex">
                        <div className="profil-tiny bg-light bg-light">
                            <ImgProfile elem={selectRequest.user}></ImgProfile>
                        </div>
                        <div className="d-flex ms-3 mb-0 mt-2 justify-content-center align-items-center">
                            <h4>{selectRequest.user.getDisplayName()}</h4>
                        </div>
                    </div>
                    <div>
                        <p className="mt-2">{selectRequest.message}</p>
                    </div>
                    <div className="d-flex">
                        <Button className="flex-even me-2" onClick={startConv} variant="primary">Converser</Button>
                        <Button className="flex-even me-2" variant="warning">Epingler</Button>
                        <Button className="flex-even me-2" variant="success">Accepter</Button>
                        <Button className="flex-even" variant="danger">Refuser</Button>
                    </div>
                </div>
            }
            {
                colList.map((col, index) =>
                    ( col.sort!=SortEnum.CANT &&
                    col.name!="Score" ) && <TableComperatorCoef
                        updateColList={updateColList}
                        colList={colList}
                        updateSelect={updateSelect}
                        select={select}
                        col={col}>

                    </TableComperatorCoef>
                )
            }
        </div>
        <div className="w-100">
            <table class="table table-striped">
                <thead>
                    <tr>
                        {
                            colList.map((col, index) =>
                                <TableComperatorCol
                                    offre={offre}
                                    updateSelect={updateSelect}
                                    select={select}
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
                                updateSelect={updateSelect}
                                select={select}
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