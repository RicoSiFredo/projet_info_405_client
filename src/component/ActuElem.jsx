import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LinearCompList from "../list/LinearCompList";

function ActuElem({actu}){
    const [message, updateMessage] = useState("");
    const [prix, updatePrix] = useState(actu.prix);
    //const [prix, updatePrix] = useState(actu.prix);
    //const [message, updateMessage] = useState("");
    function postuler(){
        actu.postuler(message, prix)
    }
    return <div className={"pb-2 border-top separator pt-3 ps-3 pe-2" }>
        <div>
            <h4>Offre d'emploi</h4>
        </div>
        <div>
            <LinearCompList
                compList={actu.compList}>

            </LinearCompList>
            <p className="mb-2">
                {"Role : " + actu.role.name}
            </p>
            <p className="mb-2">
                {"Message : " + actu.comment}
            </p>
            <p className="mb-2">
                {"Prix : " + actu.price + " €"}
            </p>
            <p className="mb-2">
                {"Durée : " + actu.duree + " j"}
            </p>
        </div>
        <div>
            <Button onClick={postuler} className="mt-0 mb-2" variant="primary">Postuler</Button>
        </div>
    </div>
}
export default ActuElem;