import { Button } from "react-bootstrap";
import React from "react";
import ImgProfile from "./ImgProfile";
import PageEnum from "../enum/PageEnum";

function UserProjectRow({user, action, updatePage}){
    function openProject(){
        action.project.update = user.update;
        user.project.set(action.project);
        updatePage(PageEnum.Project);
    }
    return <div className="d-flex pb-2 border-top separator pt-2 ps-3 pe-2">
        <div onClick={openProject} className="profil-tiny bg-light bg-light">
            <ImgProfile elem={action.project}></ImgProfile>
        </div>
        <div className="ms-3">
            <h5 onClick={openProject} className="click mb-1">{action.project.name}</h5>
            <p className="mb-0">{action.role.name}</p>
        </div>
    </div>
}
export default UserProjectRow;