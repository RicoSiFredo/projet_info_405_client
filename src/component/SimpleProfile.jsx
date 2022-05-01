import { Button } from "react-bootstrap";
import React from "react";
import ImgProfile from "./ImgProfile";
import PageEnum from "../enum/PageEnum";
import User from "../object/User";
import { Link } from "react-router-dom";

function SimpleProfile({content, elem, user, action, isProject, rootUser, border=true}){
    if(action!=undefined){
        let url;
        if(isProject){
            url = "/project/" + action.project.id_str;
        }
        else {
            url = "/profil/" + action.user.id_str;
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
        return <div className={"d-flex pb-2 " + ( border ? "border-top separator" : "" ) + " pt-2 ps-3 pe-2" }>
            <Link className="text-decoration-none text-dark" to={url}>
                <div className="profil-tiny bg-light bg-light">
                    {profile}
                </div>
            </Link>
            <div className="ms-3 flex align-items-center">
                <Link className="text-decoration-none text-dark" to={url}>
                    <h5 className="click mb-1">{name}</h5>
                </Link>
                {action.role.name!=""&&<p className="mb-0">{action.role.name}</p>}
            </div>
        </div>
    }
    else {
        let url;
        if(isProject){
            url = "/project/" + elem.id_str;
        }
        else {
            url = "/profil/" + elem.id_str;
        }
        let name;
        if(elem instanceof User){
            name = elem.firstname + " " + elem.lastname
        }
        else {
            name = elem.name
        }
        //flex view
        return <div className={"d-flex pb-2 " + ( border ? "border-top separator" : "" ) + " pt-2 ps-3 pe-2" }>
            <Link className="text-decoration-none text-dark" to={url}>
                <div className="profil-tiny bg-light bg-light">
                    <ImgProfile elem={elem}></ImgProfile>
                </div>
            </Link>
            <div className="ms-3 d-flex align-items-center">
                <Link className="text-decoration-none text-dark" to={url}>
                    <h5 className=" click mb-1">{name}</h5>
                </Link>
                {content}
            </div>
        </div>
    }
}
export default SimpleProfile;