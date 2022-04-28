import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../list/ElemList";
import UserProjectList from "../list/UserProjectList";
import Data from "../utils/Data";
import HTTP from "../utils/HTTP";
import Constant from "../utils/Constant";
import ListEats from "../object/base/ListEats";
import React from "react"





function Message({message,own,updatePage}){


    let image = message.auteur.banner;
    let profilPic = "http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/" + image;
    
    let dateMessage = new Date(message.date * 1000).toLocaleString();

    console.log(message);
    if (image !== undefined){
        return(
        
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img
                        className="messageImg"
                        src={profilPic}
                        alt=""
                    />
                    <p className="messageText">{message.text}</p>
                </div>
                <div className="messageBottom"><p>{dateMessage}</p></div>
            </div>
        )
    }else{
        return(
        
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img
                        className="messageImg"
                        src="profile_empty.png"
                        alt=""
                    />
                    <p className="messageText">{message.text}</p>
                </div>
                <div className="messageBottom"><p>{dateMessage}</p></div>
            </div>
        )
    }
    
}

export default Message;