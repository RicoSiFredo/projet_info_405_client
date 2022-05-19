import React from "react";
import { useState } from "react";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";
import LinearCompList from "../list/LinearCompList";
import ListEats from "../object/base/ListEats";
import Utils from "../utils/Utils";
function CvElemView({cvElem, user}){
    const [showDescriptionProject, updateShowDescriptionProject] = useState(false);

    let icon;
    if(!showDescriptionProject){
        icon = <CaretRightFill className="text-black mb-1 me-1"></CaretRightFill>;
    }
    else {
        icon = <CaretDownFill className="text-black me-1 mb-1"></CaretDownFill>;
    }

    function openDescriptionProject(){
        updateShowDescriptionProject(!showDescriptionProject);
    }
    return <div>
        <div className="mb-1" onClick={openDescriptionProject}>
            <span>{icon}{cvElem.name}</span>
        </div>
        {showDescriptionProject&&<p className="mb-2">{cvElem.descriptionProject}</p>}
        <h5>{cvElem.role}</h5>
        <div className="mb-2 mt-3">
            <LinearCompList
                compList={cvElem.compList}>

            </LinearCompList>
        </div>
        <p className="mb-1">{cvElem.description}</p>
        <p className="mb-1">Début : {Utils.getDate(cvElem.start, 0)}</p>
        <p className="mb-1">Fin : {Utils.getDate(cvElem.end, 0)}</p>
        <p className="mb-1">Heure hebdomadaire 35</p>
        <p className="mb-1">Expérience : 250h / + de 5 semaines</p>
    </div>
}
export default CvElemView;