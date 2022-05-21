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
            score,
            false,
            [],
            true,
            "Score",
            "Ce score synthétise les differentes qualités du candidat. Il évolu en fonction des coefficient que vous avez choisi."
        ),
        new ComparatorCol(
            "Nom"
        ),
        new ComparatorCol(
            "Status",
            SortEnum.UNDEFINED,
            scoreStatue,
            false,
            [],
            true,
            "Status",
            "Le status représente le temps qu'un candidat est prêt a investir dès maintenant pour votre projet."
        ),
        new ComparatorCol(
            "Salaire",
            SortEnum.UNDEFINED,
            scoreSalaire,
            false,
            [],
            true,
            "Salaire",
            "Salaire demandé par le candidat pour exercer ce poste."
        ),
        new ComparatorCol(
            "Commentaire",
            SortEnum.UNDEFINED,
            scoreCommentaire,
            false,
            [],
            true,
            "Commentaire",
            "Dans la colonne commentaire apparaissent les differents avis laissés à propos du candidat."
        ),
        new ComparatorCol(
            "Age",
            SortEnum.UNDEFINED,
            scoreAge,
            false,
            [],
            true,
            "Age",
            "Age du candidat"
        ),
        new ComparatorCol(
            "Compétences",
            SortEnum.UNDEFINED,
            scoreComp,
            false,
            [],
            true,
            "Compétences",
            "Dans la colonne compétences apparaissent les differentes téchnologies que le candidat déclare maitriser. Cliquez sur l'une d'entre elles pour décourvir l'experience du candidat."
        ),
        new ComparatorCol(
            "Expérience",
            SortEnum.UNDEFINED,
            scoreExperience,
            true,
            [],
            true,
            "Expérience",
            "Expérience du candidat, exrpimé en valeur de temps. Vous pouvez selctionner des filtres pour retenir qu'une ou plusieurs compétences."
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
    function pin(){
        selectRequest.pin();
    }
    function refuse(){
        selectRequest.refuseFunc();
    }
    let buttonContent;
    if(selectRequest==undefined){

    }
    else if(selectRequest.refuse==true){
        buttonContent = <div className="d-flex">
            <Button className="flex-even" onClick={refuse} variant="danger">Annuler le refue</Button>
        </div>
    }
    else {
        buttonContent = <div className="d-flex">
            <Button className="flex-even me-2" onClick={startConv} variant="primary">Converser</Button>
            <Button className="flex-even me-2" onClick={pin} variant="warning">{!selectRequest.pinned?"Epingler":"Dépingler"}</Button>
            <Button className="flex-even me-2" variant="success">Accepter</Button>
            <Button className="flex-even" onClick={refuse} variant="danger">Refuser</Button>
        </div>
    }
    return <div className="d-flex  h-100">
        <div className="w-25 h-100 overflow-auto border-right-comapretor o">
            <div className="p-3 bg-light border-bottom-comapretor">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <h2>{"Offre"}</h2>
                    </div>
                    {offre.action.user!=undefined&&
                    <div className="d-flex ps-1 pe-2 border border-dark rounded  pt-1">
                        <div className="justify-content-center align-items-center profil-tinylow bg-light bg-light">
                            <ImgProfile elem={offre.action.user}></ImgProfile>
                        </div>
                        <div className="d-flex ms-2 mb-0 justify-content-center align-items-center">
                            <h6>{offre.action.user.getDisplayName()}</h6>
                        </div>
                    </div>}
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
                    {buttonContent}
                </div>
            }
            <div className="bg-light p-3">
                <h4>Choix des coefficients</h4>
                <p>Pour calculer le score, nous appliquons un coefficient à chaque colonne. Vous pouvez les personnaliser pour trouver la personne qui correspond le mieux à votre demande.</p>
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