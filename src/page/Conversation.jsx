import Message from "./Message";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddSkill from "../component/AddSkill";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../object/list/SkillList";
import UserProjectList from "../object/list/UserProjectList";
import Data from "../utils/Data";
import HTTP from "../utils/HTTP";
import Constant from "../utils/Constant";
import ListEats from "../object/base/ListEats";





function Conversation({conversation,updatePage}){
    const currentUser = conversation.parent;
    conversation.update = currentUser.update;

    useEffect(function(){
        conversation.getAllMembers();
        
    }, []);

        const friend = (conversation.members.list.find((m) => m !== currentUser.id_str));
        if (friend != undefined) {
            return(
                <div className="conversation">
                    <span className="conversationName">{friend.firstname}</span>
                </div>
            )

        }else{
            return(
            <p>Chargement</p>
            )
        }
    

   




}
export default Conversation;