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

    



    return(
        <div className="message">
            <div className="messageTop">
                <p className="messageText">Message : {message.text} écrit par : {message.auteur.firstname}</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}

export default Message;