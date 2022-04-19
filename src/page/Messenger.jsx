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
import Message from "./Message";
import Utils from "../utils/Utils";


function Messenger({back, user, updatePage}){
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    

    useEffect(function(){
        user.getAllConv();
    }, []);

    
    const conversations = user.convList.list;
    

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



    // function createMessage(){
        
    //         function(error){
    //             if(failed!=undefined){
    //                 failed(error);
    //             }
    //         },
    //         function(response){
    //             if(success!=undefined){
    //                 success(response);
    //             }
    //         }
    //     )
    // }

    

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

    
    
    
    console.log(currentChat);

    return (
        <div className="Messsenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Rechercher des amis" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation key={c.id_str} conversation={c}/>
                            </div>
                        ))}
                    <h1>menu</h1>
                   
                </div>
            </div>
    
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <h1>box</h1>
                    {
                        currentChat ?
                    (<>
                    <div className="chatBoxTop">
                    {messages.map((m) => (
                            <Message key={m.id_str} message={m}/>
                        ))}
                    </div>
                    <div className="cahtBoxBottom">
                        <textarea className="chatMessageInput" placeholder="ecrivez quelque chose..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Envoyer</button>
                    </div></>
                    ) : (
                    <span className="noConversationText">Open a conversation to start a chat.</span>
                    )}
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