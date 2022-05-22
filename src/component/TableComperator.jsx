import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import SortEnum from "../enum/SortEnum";
import ComparatorCol from "../object/comparator/ComparatorCol";
import ImgProfile from "./ImgProfile";
import TableComperatorCoef from "./TableComperatorCoef";
import TableComperatorCol from "./TableComperatorCol";
import TableComperatorRow from "./TableComperatorRow";
import LinearCompList from "../list/LinearCompList";
import Utils from "../utils/Utils";
import { Modal } from "react-bootstrap";
import Field from "./Field";
import Eats from "../object/base/Eats";
import Data from "../utils/Data";
import ListEats from "../object/base/ListEats";
import CompareEats from "../object/base/CompareEats";

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
    const [show, updateShow] = useState(false);
    const [value, updateValue] = useState("");
    const [listUser, updateListUser] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    listUser.update = function(){
        updateListUser(Eats.fakeUpdate(listUser))
    }
    function handleClose() {
        updateShow(false);
    }
    useEffect(function(){
        listUser.reset();
        if(value.length==0){

        }
        else {
            listUser.makeRequest(
                "search/user",
                {
                    access_token: Data.accessToken(),
                    name: value
                },
                function(err){

                },
                function(result){

                }
            )
        }
    }, [value])
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
    function unpin(){
        selectRequest.unpin();
    }
    function accept(){
        selectRequest.acceptFunc();
    }
    function refuse(){
        selectRequest.refuseFunc();
    }
    function fermer(){
        offre.fermerFunc();
    }
    function unrefuse(){
        selectRequest.unrefuseFunc();
    }
    function inviteElem(){
        updateValue("")
        updateShow(true);
    }
    function changeValue(e){
        updateValue(e.target.value);
    }
    let buttonActuContent;
    if(offre.fermer===true){
        buttonActuContent = <div>
            <p className="mb-3">L'offre est fermée.</p>
            <div className="d-flex">
                <Button className="flex-even me-2" onClick={inviteElem} disabled variant="primary">Inviter</Button>
                <Button className="flex-even" onClick={fermer} variant="danger" disabled>Fermer</Button>
            </div>
        </div>
    }
    else {
        buttonActuContent = <div className="d-flex">
            <Button className="flex-even me-2" onClick={inviteElem} variant="primary">Inviter</Button>
            <Button className="flex-even" onClick={fermer} variant="danger">Fermer</Button>
        </div>
    }
    let buttonContent;
    if(selectRequest==undefined){

    }
    else if(selectRequest.accept==true){
        buttonContent = <div>
            <p>A été accepté pour rejoindre le projet suite à sa demande.</p>
            <div className="d-flex">
                <Button className="flex-even" disabled variant="success">Accpeter</Button>
            </div>
        </div>
    }
    else if(selectRequest.invited==true&&selectRequest.refuse==true){
        buttonContent = <div className="d-flex">
            <Button disabled={offre.fermer===true} className="flex-even" onClick={unrefuse} variant="success">Réinviter</Button>
        </div>
    }
    else if(selectRequest.refuse==true){
        buttonContent = <div className="d-flex">
            <Button disabled={offre.fermer===true} className="flex-even" onClick={unrefuse} variant="danger">Annuler le refu</Button>
        </div>
    }
    else if(selectRequest.invited==true){
        buttonContent = <div className="d-flex">
            <Button disabled={offre.fermer===true} className="flex-even me-2" onClick={!selectRequest.pinned?pin:unpin} variant="warning">{!selectRequest.pinned?"Epingler":"Dépingler"}</Button>
            <Button disabled={offre.fermer===true} className="flex-even" onClick={refuse} variant="danger">Annuler l'invitation</Button>
        </div>
    }
    else {
        //<Button className="flex-even me-2" onClick={startConv} variant="primary">Converser</Button>
        buttonContent = <div className="d-flex">
            <Button disabled={offre.fermer===true} className="flex-even me-2" onClick={!selectRequest.pinned?pin:unpin} variant="warning">{!selectRequest.pinned?"Epingler":"Dépingler"}</Button>
            <Button className="flex-even me-2" variant="success" disabled={offre.fermer===true} onClick={accept}>Accepter</Button>
            <Button disabled={offre.fermer===true} className="flex-even" onClick={refuse} variant="danger">Refuser</Button>
        </div>
    }
    function requested(user_id){
        let found = false;
        let i = 0;
        while(!found&&i<offre.requestList.size()){
            found = offre.requestList.get(i).user.id_str==user_id;
            i += 1;
        }
        return found;
    }
    function inviteMec(user_id){
        offre.invite(user_id);
    }
    function getCustomContent(user_id){
        let res = undefined;
        if(requested(user_id)){
            res = <div>
                <p className="mb-0">Cet utilisateur à déjà été invité.</p>
            </div>
        }
        else if(user_id==Data.getUserId()){
            res = undefined;
        }
        else {
            res = <div className="d-flex">
                <Button onClick={()=>inviteMec(user_id)} className="mt-2">
                    Inviter
                </Button>
            </div>
        }
        return res;
    }
    let endDate = "";
    if(offre.end!=0){
        endDate = " / " + Utils.getDate(offre.end, 0)
    }
    return <div className="d-flex  h-100">
        <div className="w-25 h-100 overflow-auto border-right-comapretor o">
            <div className="p-3 bg-light border-bottom-comapretor">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <h2>{"Offre"}</h2>
                    </div>
                    {offre.action.user!=undefined&&
                    <div className="d-flex ps-1 pe-2 border border-dark rounded  pt-1 pb-1">
                        <div className="justify-content-center align-items-center profil-tiny bg-light bg-light">
                            <ImgProfile elem={offre.action.user}></ImgProfile>
                        </div>
                        <div className="d-flex ms-2 mb-0 justify-content-center align-items-center">
                            <h6>{offre.action.user.getDisplayName()}</h6>
                        </div>
                    </div>}
                </div>
                    <div className="mb-2 mt-2">
                        {Utils.getOffreLigne(offre)}
                    </div>
                <div>
                    <p className="mt-2">{offre.description}</p>
                    <LinearCompList
                        compList={offre.compList}>

                    </LinearCompList>
                    <div className="mt-3">
                        {buttonActuContent}
                    </div>
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
                        <p className="mt-2">{Utils.getOffreLigne(offre)}</p>
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
            <table className="table table-striped">
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
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Inviter un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Field val={value} changeValue={changeValue} label={"Rechercher un utilisateur"}></Field>
                {
                    listUser.map((user, index) =>
                        <div className={"d-flex mt-3 border-top separator pt-2"} key={"user_"+index}>
                            <div className="text-decoration-none text-dark">
                                <div className="profil-tiny bg-light bg-light">
                                    <ImgProfile elem={user}></ImgProfile>
                                </div>
                            </div>
                            <div className="ms-3 d-flex align-items-center">
                                <div className="text-decoration-none text-dark">
                                    <h5 className=" click mb-1">{user.getDisplayName()}</h5>
                                    {
                                        getCustomContent(user.id_str)
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default TableComperator;