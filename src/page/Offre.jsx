import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Actu from "../object/Actu";
function Offre({rootUser}){
    const {id} = useParams();
    const [offre, updateOffre] = useState(new Actu());
    return <p>GATEAU LA GESTION CIRITQUE</p>
}
export default Offre;