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
import Conversation from "./Conversation";



function Messenger({back, user, updatePage}){
    

    useEffect(function(){
        user.getAllConv();
    }, []);

    
    const conversations = user.convList.list;

    
    
    

    return (
        <div className="Messsenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Rechercher des amis" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <Conversation key={c.id_str} conversation={c}/>
                        ))}
                    <h1>menu</h1>
                   
                </div>
            </div>
    
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <h1>box</h1>
                    <div className="chatBoxTop">
                    </div>
                    <div className="cahtBoxBottom">
                        <textarea className="chatMessageInput" placeholder="ecrivez quelque chose..."></textarea>
                        <button className="chatSubmitButton">Envoyer</button>
                    </div>
                </div>
            </div>
    
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <h1>online</h1>
                </div>
            </div>
        </div>
        
        
        )
    
}
export default Messenger;