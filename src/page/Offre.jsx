import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableComperator from "../component/TableComperator";
import Actu from "../object/Actu";
import Eats from "../object/base/Eats";
function Offre({rootUser}){
    const {id} = useParams();
    const [offre, updateOffre] = useState(new Actu());
    offre.id_str = id;
    useEffect(function(){
        offre.getBase()
        offre.getRequestAll()
    }, []);
    function update(){
        updateOffre(Eats.fakeUpdate(offre));
    }
    offre.update = update;
    return <div>
        <p>GATEAU LA GES TION CIRITQUE</p>
        <TableComperator offre={offre}>

        </TableComperator>
        {
            offre.requestList.map((request, index) => 
                <div>
                    <p>{request.user.firstname}</p>
                </div>
            )
        }
    </div>
}
export default Offre;