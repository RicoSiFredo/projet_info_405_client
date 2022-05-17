import React, { useState } from "react";
import { CaretRightFill, CaretDownFill, CaretRight } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";
import Actu from "../object/Actu";
import History from "../object/History";
import Role from "../object/Role";
function HistoryElem({history}){
    let array_month_fr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    function toDate(date){
        try {
            let dateObj = new Date(date*1000)
            return dateObj.getDate()+" "+array_month_fr[dateObj.getMonth()]+" "+dateObj.getFullYear();
        } catch(e){
            return ""
        }
    }
    const [visi, updateVisi] = useState(false);
    function openDesc(){
        if(history.descriptionProject!=""){
            updateVisi(!visi);
        }
    }
    console.log(history.compList)
    let display;
    if(history.descriptionProject!=""){
        display = visi ? <CaretDownFill className="me-1"></CaretDownFill> : <CaretRightFill className="me-1"></CaretRightFill>
    }
    let className = "";
    if(history instanceof History){
        className = "pb-2 border-top separator pt-2 ps-3 pe-2"
    }
    let role;
    if(history.role instanceof Role){
        role = history.role.name;
    }
    else {
        role = history.role;
    }
    let content;
    console.log(history)
    if(history instanceof History){
        content = <div>
            <div className="mb-2">
                <span className="me-1" onClick={openDesc}>
                    {display}
                    {history.name}
                </span> - {toDate(history.start) + " / " + toDate(history.end)} {history.heure!=""&&(" - "+history.heure+"h")}{(history.price!="")&&(" - "+history.price+"€")}
            </div>
            <p className={visi?"d-block":"d-none"}>{history.descriptionProject}</p>
        </div>
    }
    else {
        content = <div>
            <div className="mb-2">
                {toDate(history.start) + " / " + toDate(history.end)} {history.heure!=""&&(" - "+history.heure+"h")}{(history.price!="")&&(" - "+history.price+"€")}
            </div>
            <p className={visi?"d-block":"d-none"}>{history.descriptionProject}</p>
        </div>
    }
    return (
        <div class={"d-flex justify-content-between " + className}>
            <div class="d-flex flex-column">
                <h5>{role}</h5>
                <div>
                    {content}
                </div>
                {history.description!=""&&<p className="mb-1">{history.description}</p>}
                <LinearCompList
                    compList={history.compList}>

                </LinearCompList>
            </div>
        </div>
    )
}
export default HistoryElem;