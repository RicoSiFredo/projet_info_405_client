import '../App.css';
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
import Conversation from "./Conversation";
import Message from "./Message";
import Utils from "../utils/Utils";
import React from "react"


function Messenger({back, user, updatePage}){
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");

    
    useEffect(function(){
        user.getAllConv();
        user.getUserFriends();
    }, []);

    
    const conversations = user.convList.list;
    console.log(user);

    useEffect(() => {
        const getMessages = async () => {
            try{
                if (currentChat != null){
                    const res = currentChat.message_list.list;
                    setMessages(res);
                }
            }catch(err){
                console.log(err);
            }
        };
        getMessages();
    },[currentChat]);


    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        try{
            if (newMessage != ("")){
                setNewMessage("");
                currentChat.envoyerMessage(newMessage);      
            }

        }catch(err){
            console.log(err);
        }
    };

    
    

    return (
        <div className="Messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Rechercher des amis" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation key={c.id_str} conversation={c}/>
                            </div>
                        ))}
                    <button className="newConv">Créer une nouvelle conversation</button>
                </div>
            </div>
    
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <h1>Boite de dialogue</h1>
                    {
                        currentChat ?
                    (<>
                    <div className="chatBoxTop">
                    {messages.slice().reverse().map((m) => (
                            <Message key={m.id_str} message={m} own={m.auteur.id_str === user.id_str}/>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="ecrivez quelque chose..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Envoyer</button>
                    </div></>
                    ) : (
                        <span className="noConversationText">Ouvrez une conversation pour commencer à discuter.</span>
                    )}
                </div>
            </div>
    
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <h1></h1>
                </div>
            </div>
        </div>
        
        
        )
    
}
export default Messenger;