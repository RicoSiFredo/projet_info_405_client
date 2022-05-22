import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableComperatorUser from "../component/TableComparatorUser";
import TableComperator from "../component/TableComperator";
import Actu from "../object/Actu";
import Eats from "../object/base/Eats";
import User from "../object/User";
function OffreUser({rootUser}){
    const {id} = useParams();
    const [user, updateUser] = useState(new User());
    user.id_str = id;
    useEffect(function(){
        user.getBase()
        user.getAllSkill()
        user.getOffreAll()
    }, []);
    function update(){
        updateUser(Eats.fakeUpdate(user));
    }
    user.update = update;
    return <div>
        <TableComperatorUser user={user}>

        </TableComperatorUser>
    </div>
}
export default OffreUser;