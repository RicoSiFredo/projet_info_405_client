import { useState } from "react";
import React from "react";
import ComparatorCol from "../object/comparator/ComparatorCol";
import SortEnum from "../enum/SortEnum";
import TableComperatorCol from "./TableComperatorCol";
import TableComperatorRowUser from "./TableComperatorRowUser";
import TableComperatorCoef from "./TableComperatorCoef";
import ImgProfile from "./ImgProfile";
import Utils from "../utils/Utils";
import { Button } from "react-bootstrap";

function score(a, b){
    if(a.getScoreUser()>b.getScoreUser()){
        return -1;
    }
    else if(a.getScoreUser()<b.getScoreUser()){
        return 1;
    }
    return 0;
}

function salaire(a, b){
    if(a.getPrice()>b.getPrice()){
        return -1;
    }
    else if(a.getPrice()<b.getPrice()){
        return 1;
    }
    return 0;
}

function heure(a, b){
    if(a.getHeure()>b.getHeure()){
        return -1;
    }
    else if(a.getHeure()<b.getHeure()){
        return 1;
    }
    return 0;
}

function comp(a, b){
    if(a.getNbComp()>b.getNbComp()){
        return -1;
    }
    else if(a.getNbComp()<b.getNbComp()){
        return 1;
    }
    return 0;
}

function date(a, b){
    if(a.getDuree()>b.getDuree()){
        return -1;
    }
    else if(a.getDuree()<b.getDuree()){
        return 1;
    }
    return 0;
}
function taille(a, b){
    if(a.getTaille()>b.getTaille()){
        return -1;
    }
    else if(a.getTaille()<b.getTaille()){
        return 1;
    }
    return 0;
}

function TableComperatorUser({user}){
    const [select, updateSelect] = useState("")
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
            "Salaire",
            SortEnum.UNDEFINED,
            salaire,
            false,
            [],
            true,
            "Salaire",
            "Salaire demandé par le candidat pour exercer ce poste."
        ),
        new ComparatorCol(
            "Heure",
            SortEnum.UNDEFINED,
            heure,
            false,
            [],
            true,
            "Commentaire",
            "Dans la colonne commentaire apparaissent les differents avis laissés à propos du candidat."
        ),
        new ComparatorCol(
            "Date",
            SortEnum.UNDEFINED,
            date,
            false,
            [],
            true,
            "Age",
            "Age du candidat"
        ),
        new ComparatorCol(
            "Compétences",
            SortEnum.UNDEFINED,
            comp,
            true,
            [],
            true,
            "Age",
            "Age du candidat"
        ),
        new ComparatorCol(
            "Taille",
            SortEnum.UNDEFINED,
            taille,
            false,
            [],
            true,
            "Age",
            "Age du candidat"
        ),
    ]);   
       
    function pin(){
        selectRequest.pinUser();
    }
    function unpin(){
        selectRequest.unpinUser();
    }
    function accept(){
        selectRequest.acceptFunc();
    }
    function refuse(){
        selectRequest.refuseUserFunc();
    }
    function unrefuse(){
        selectRequest.unrefuseUserFunc();
    }

    let selectCol;
    for(let i = 0; i < colList.length; i++){
        if(colList[i].sort!=SortEnum.CANT&&
        colList[i].sort!=SortEnum.UNDEFINED){
            selectCol = colList[i];
        }
    }

    let list = []
    for (let i = 0; i < user.requestList.size(); i++){
        let request = user.requestList.get(i);
        request.colList = colList;
        let found = false;
        let j = 0;
        if(colList[7].array.length==0){
            found = true;
        }
        else {
            while(!found&&j<colList[7].array.length){
                let skill = colList[7].array[j];
                if(request.actu.have(skill)){
                    found = true;
                }
                j += 1;
            }
        }
        if(found){
            list.push(request)
        }
    }

    if(selectCol.sort==SortEnum.ASC){
        list.sort(selectCol.compAsc);
    }
    else {
        list.sort(selectCol.compDesc);
    }

    let selectRequest = undefined;
    for(let i = 0; i < user.requestList.size(); i++){
        let request = user.requestList.get(i);
        if(request.id_str==select){
            selectRequest = request;
        }
    }

    let buttonContent;
    if(selectRequest==undefined){

    }
    else if(selectRequest.accept==true){
        buttonContent = <div>
            <p>Vous faites désormais partie du projet !</p>
            <div className="d-flex">
                <Button className="flex-even" disabled variant="success">Accepter</Button>
            </div>
        </div>
    }
    else if(selectRequest.invited==true&&selectRequest.refuse_user==true){
        buttonContent = <div className="d-flex">
            <Button disabled={user.fermer===true} className="flex-even" onClick={unrefuse} variant="danger">Annuler le refus</Button>
        </div>
    }
    else if(selectRequest.refuse==true){
        buttonContent = <div className="d-flex">
            <p>Vous avez été refusez.</p>
        </div>
    }
    else if(selectRequest.invited==undefined){
        buttonContent = <div className="d-flex">
            <Button disabled={user.fermer===true} className="flex-even me-2" onClick={!selectRequest.pinned_user?pin:unpin} variant="warning">{!selectRequest.pinned_user?"Epingler":"Dépingler"}</Button>
            <Button disabled={user.fermer===true} className="flex-even" onClick={accept} variant="success">Accepter</Button>
        </div>
    }
    else if(selectRequest.invited==true){
        //<Button className="flex-even me-2" onClick={startConv} variant="primary">Converser</Button>
        buttonContent = <div className="d-flex">
            <Button disabled={user.fermer===true} className="flex-even me-2" onClick={!selectRequest.pinned_user?pin:unpin} variant="warning">{!selectRequest.pinned_user?"Epingler":"Dépingler"}</Button>
            <Button className="flex-even me-2" variant="success" disabled={user.fermer===true} onClick={accept}>Accepter</Button>
            <Button disabled={user.fermer===true} className="flex-even" onClick={refuse} variant="danger">Refuser</Button>
        </div>
    }
    return <div className="d-flex  h-100">
            <div className="w-25 h-100 overflow-auto border-right-comapretor o">
                {(selectRequest!=undefined)&&
                    <div className="p-3 bg-light border-bottom-comapretor">
                        <div className="d-flex">
                            <div className="profil-tiny bg-light bg-light">
                                <ImgProfile elem={selectRequest.user}></ImgProfile>
                            </div>
                            <div className="d-flex ms-3 mb-0 mt-2 justify-content-center align-items-center">
                                <h4>{selectRequest.actu.project.name}</h4>
                            </div>
                        </div>
                        <div>
                            <p className="mt-2">{Utils.getOffreLigne(selectRequest.actu)}</p>
                        </div>
                        <div>
                            <p className="mt-2">{selectRequest.actu.description}</p>
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
                                        offre={user}
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
                                request && <TableComperatorRowUser 
                                offre={user} 
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
export default TableComperatorUser;