import ListRolePerm from "../component/ListRolePerm";
import React from "react"

function ManageRole({project}){
    return <div>
        <p>Liste des rôles</p>
        <ListRolePerm project={project}>

        </ListRolePerm>
    </div>
}
export default ManageRole;