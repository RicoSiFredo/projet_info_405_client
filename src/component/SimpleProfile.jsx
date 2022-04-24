import { Button } from "react-bootstrap";
import React from "react";
import ImgProfile from "./ImgProfile";
import PageEnum from "../enum/PageEnum";
import User from "../object/User";

function SimpleProfile({content, elem, user, action, updatePage, isProject}){
    if(action!=undefined){
        function openElem(){
            if(isProject){
                action.project.update = user.update;
                user.project.set(action.project);
                updatePage(PageEnum.Project);
            }
            else {
                action.user.update = user.update;
                user.user.set(action.user);
                updatePage(PageEnum.Profil);
            }
        }
        let name;
        if(isProject){
            name = action.project.name
        }
        else {
            name = action.user.firstname + " " + action.user.lastname
        }
        let profile;
        if(isProject){
            profile = <ImgProfile elem={action.project}></ImgProfile>
        }
        else {
            profile = <ImgProfile elem={action.user}></ImgProfile>
        }
        let url = "";
        if(isProject){
            url = "/project/" + action.project.id_str
        }
        else {
            url = "/user/" + action.user.id_str
        }
        return <div className="d-flex pb-2 border-top separator pt-2 ps-3 pe-2">
            <a href="#" class="text-decoration-none link-dark">
                <div onClick={openElem} className="profil-tiny bg-light bg-light">
                    {profile}
                </div>
            </a>
            <div className="ms-3">
                <a href="#" class="text-decoration-none link-dark">
                    <h5 onClick={openElem} className="click mb-1">{name}</h5>
                </a>
                <p className="mb-0">{action.role.name}</p>
            </div>
        </div>
    }
    else {
        let name;
        if(elem instanceof User){
            name = elem.firstname + " " + elem.lastname
        }
        else {
            name = elem.name
        }
        //flex view
        return <div className="d-flex pb-2 border-top separator pt-2 ps-3 pe-2">
            <div className="profil-tiny bg-light bg-light">
                <ImgProfile elem={elem}></ImgProfile>
            </div>
            <div className="ms-3">
                <h5 className="click mb-1">{name}</h5>
                {content}
            </div>
        </div>
    }
}
export default SimpleProfile;