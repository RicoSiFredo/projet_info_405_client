import React from "react";
import { Button } from "react-bootstrap";

function ActuElem({actu}){
    return <div className={"pb-2 border-top separator pt-3 ps-3 pe-2" }>
        <div>
            <h4>Offre d'emploie</h4>
        </div>
        <div>
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
            <Button className="mt-0 mb-2" variant="primary">Postuler</Button>
        </div>
    </div>
}
export default ActuElem;