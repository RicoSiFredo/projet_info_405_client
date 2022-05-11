import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ListEats from "../object/base/ListEats";
import ConversationView from "./ConversationView";
import Message from "./Message";
import Eats from "../object/base/Eats";
import Conversation from "../object/Conversation";
import React from "react"
import { useParams, Link } from "react-router-dom";


function Messenger({user}){
    const {id} = useParams();
    const [show, updateShow] = useState(false);
    const [currentChat, setCurrentChat] = useState(new Conversation());
    currentChat.id_str = id
    function update(){
        setCurrentChat(Eats.fakeUpdate(currentChat));
        // fait croire à un changement
    }
    currentChat.update = update;

    const [newMessage,setNewMessage] = useState("");
    const [name, updateName] = useState("");
    const [listFriends, updateList] = useState(new ListEats("", undefined));

    useEffect(function(){
        showFriends();
    }, [name])

    function addConv() {
        updateShow(true);
    }

    listFriends.update = function(){
        updateList(Eats.fakeUpdate(listFriends))
    }

    

    function showFriends(){
        listFriends.reset();
        listFriends.makeRequest(
            'user/get/userFriends', 
            {
                idUser: user.id_str,
            },
            function(error){
            },
            function(response){
            }
        )
    }

    function handleClose() {
        updateShow(false);
    }

    useEffect(function(){
        if(currentChat!=undefined){
            currentChat.message_list.reset()
            currentChat.getAllMessages();
        }
    }, [currentChat, ])
    useEffect(function(){
        user.getAllConv();
        user.getUserFriends();
    }, [user.logged, ]);

    
    const conversations = user.convList.list;

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
                            <Link to={"/message/"+c.id_str}>
                                <ConversationView key={c.id_str} conversation={c}/>
                            </Link>
                        ))}
                    <button className="btn btn-primary" onClick={addConv}>Nouvelle conversation</button>
                </div>
            </div>
    
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <h1>Boite de dialogue</h1>
                    {
                        (currentChat.id_str != -1) ?
                    (<>
                    <div className="chatBoxTop">
                    {currentChat.message_list.list.slice().reverse().map((m) => (
                            <Message key={m.id_str} message={m} own={m.auteur.id_str === user.id_str}/>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="ecrivez quelque chose..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                        <button className="btn btn-primary" onClick={handleSubmit}>Envoyer</button>
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

            <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Démarrer une nouvelle discussion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Amis</h1>
                {
                listFriends.map((obj, index) => {
                    const createConv = (e) => {
                        e.preventDefault();
                        
                        try{
                                user.createConversation(obj.id_str);
                                    
                
                        }catch(err){
                            console.log(err);
                        }
                    };
                        if (obj.id_str !== user.id_str){
                            return (
                                <div>
                                    {obj.firstname}
                                    <button type="button" className="btn btn-primary" onClick={createConv}>Créer une nouvelle conversation</button>
                                </div>
        
                            )
                        }
                        
                     
                })
            }
            </Modal.Body>
            </Modal>
        </div>
        
        
        )
    
}
export default Messenger;