import { Button } from "react-bootstrap";
import React from "react";
import { PenFill } from "react-bootstrap-icons";
import ProfilField from "./ProfilField";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import ErrorShow from "./ErrorShow";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Data from "../utils/Data";
import ImgProfile from "./ImgProfile";

const NONE_ERROR = -1;
const SIZE_ERROR = 0;
const BAD_EXT_ERROR = 1;
const FAILED_ERROR = 2;

function ProfilView({elem, isProject=false}){
    let canEdit = true; 
    const [error, setError] = useState(NONE_ERROR);

    function openFilePicker(elemId) {
        var elem = document.getElementById(elemId);
        if(elem && document.createEvent) {
           var evt = document.createEvent("MouseEvents");
           evt.initEvent("click", true, false);
           elem.dispatchEvent(evt);
        }
    } 
    const handleFileBannerInput = function(e){
        sendFile("banner", e.target.files[0])
    }
    const handleFileProfilInput = function(e){
        sendFile("profile", e.target.files[0])
    }
    let key;
    if(isProject){
        key = "project";
    }
    else{
        key = "user";
    }
    function sendFile(type, file){
        if (file.size > 8192000){
            setError(SIZE_ERROR);
        }
        else {
            let ext = file.name.split('.').pop();
            let goodExt = false;
            if(type == "banner"){
                goodExt = Constant.BANNER_EXT.includes(ext);
            } else {
                goodExt = Constant.PROFIL_EXT.includes(ext);
            }
            if(goodExt){
                const formData = new FormData();
                formData.append('file', file);
                formData.append('id', elem.id_str);
                formData.append('access_token', Data.accessToken());
                HTTP.queryPostFromData(
                    Constant.SERVER_URL + key + "/set/" + type,
                    formData,
                    function(err){
                    },
                    function(result){
                        if(result["status"] == "success"){
                            elem.applyRequest(result);
                        }
                        else{
                            setError(FAILED_ERROR);
                        }
                    }
                );
            }
            else {
                setError(BAD_EXT_ERROR);
            }
        }
    }
    function addBanner(){
        openFilePicker("file-banner");
    }
    function addProfil(){
        openFilePicker("file-profil");
    }
    function resetError(){
        setError(NONE_ERROR);
    }
    let field;
    if(isProject){
        field = <div>
            <div className="mt-3 ms-3 me-2">
                <ProfilField tag="h4" user={elem} isProject={isProject} label={"Nom"} name={"name"} canEdit={canEdit} value={elem.name}></ProfilField>
            </div>
            <div className="mt-3 mb-2 ms-3 me-2">
                <ProfilField multipleLine={true} user={elem} isProject={isProject} label={"Description"} name={"description"} canEdit={canEdit} value={elem.description}></ProfilField>
            </div>
        </div>
    }
    else {
        field = <div>
            <div className="mt-3 ms-3 me-2">
                <ProfilField user={elem} isProject={false} label={"Prénom"} name={"firstname"} canEdit={canEdit} value={elem.firstname}></ProfilField>
            </div>
            <div className="mt-3 ms-3 me-2">
                <ProfilField user={elem} isProject={false} label={"Nom"} name={"lastname"} canEdit={canEdit} value={elem.lastname}></ProfilField>
            </div>
            <div className="mt-3 mb-3 ms-3 me-2">
                <ProfilField multipleLine={true} user={elem} isProject={isProject} label={"Description"} name={"description"} canEdit={canEdit} value={elem.description}></ProfilField>
            </div>
        </div>
    }
    return <div>
        <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden">
            <div className="banner border-bottom border-4 border-primary position-relative">
                {elem.banner &&
                <img src={Constant.IMAGE_URL+elem.banner} className="center-crop w-100 h-100" alt=""/>}
                <Button onClick={addBanner} className="p-absolute bottom-right ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <PenFill></PenFill>
                </Button>
                <input onChange={handleFileBannerInput} type={"file"} id="file-banner" className="d-none"/>
            </div>
            <div className="profil bg-light bg-light" onClick={addProfil}>   
                <ImgProfile elem={elem}></ImgProfile>
                <input onChange={handleFileProfilInput} type={"file"} id="file-profil" className="d-none"/>
            </div>
            {field}
        </div>
        <ErrorShow 
            handleClose={resetError}
            show={error==SIZE_ERROR}
            close="Fermer"
            info="Un fichier ne peut excéder 8 MB."
            title="Fichier trop volumineux">
            
        </ErrorShow>
        <ErrorShow 
            handleClose={resetError}
            show={error==BAD_EXT_ERROR}
            close="Fermer"
            info="Le fichier ne peut être que de type .png, .jpg ou .jpeg."
            title="Mauvaise extension de fichier">
            
        </ErrorShow>
        <ErrorShow
            handleClose={resetError}
            show={error==FAILED_ERROR}
            close="Fermer"
            info="Une erreur est survenue lors de l'envoi du fichier."
            title="Erreur">
        </ErrorShow>
    </div>
}
export default ProfilView;