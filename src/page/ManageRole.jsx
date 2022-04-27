import ListRolePerm from "../component/ListRolePerm";
import React from "react"

function ManageRole({project}){
    return <div className="w-45 left-div">
        <div className="card mt-2 ms-2 me-2 p-2 bg-light bg-gradient overflow-hidden">

        <ListRolePerm project={project}>

        </ListRolePerm>

        </div>
        </div>
}
export default ManageRole;