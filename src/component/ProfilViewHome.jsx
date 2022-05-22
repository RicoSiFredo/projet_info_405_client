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
import { Rating } from 'react-simple-star-rating'
import ElemList from "../list/ElemList";
import Actu from "../object/Actu";
import LinearCompList from "../list/LinearCompList";

const NONE_ERROR = -1;
const SIZE_ERROR = 0;
const BAD_EXT_ERROR = 1;
const FAILED_ERROR = 2;

function ProfilViewHome({elem, isProject=false , note}){
    let canEdit = true; 

    let key;
    if(isProject){
        key = "project";
    }
    else{
        key = "user";
    }
    
    let field;
    if(isProject){
        field = <div>
            <div className="mt-3 ms-3 me-2">
               <h3>{elem.name}</h3>
            </div>
            <div className="mt-3 mb-2 ms-3 me-2">
                <h6>{elem.description}</h6>
            </div>
        </div>
    }
    else {
        if (elem instanceof Actu){
            field = <div>
                        <div className="mt-3 ms-3 me-2">
                            <h4 className="me-3">{elem.name}</h4>
                        </div>
                        <div className="mt-3 mb-3 ms-3 me-2">
                            <h6>{elem.description}</h6>
                        </div>
                        <div className="ms-5">
                            <ElemList list={elem.skillList != undefined ? elem.skillList : elem.tecnoList}></ElemList>

                        </div>
                    </div>
        }else{
            field = <div>
                        <div className="mt-3 ms-3 me-2 d-flex align-items-end">
                            <h4 className="me-3">{elem. getDisplayName()}</h4>
                            <Rating
                                readonly={true}
                                allowHover={false}
                                ratingValue={note}
                                allowHalfIcon={true}/>
                        </div>
                        <div className="mt-3 mb-3 ms-3 me-2">
                            <h6>{elem.description}</h6>
                        </div>
                        <div className="ms-3 mb-3">
                            <LinearCompList compList={elem.skillList != undefined ? elem.skillList : elem.tecnoList}></LinearCompList>

                        </div>
                    </div>
        }
  
    }
    return <div className="w-100">
        <div className="card bg-light bg-gradient overflow-hidden ombre">
            <div className="banner border-bottom border-4 border-primary position-relative">
                {elem.banner &&
                <img src={Constant.IMAGE_URL+elem.banner} className="center-crop w-100 h-100" alt=""/>}

            </div>
            <div className="profil bg-light bg-light">   
                <ImgProfile elem={elem}></ImgProfile>

            </div>
            {field}
        </div>
    </div>
}
export default ProfilViewHome;