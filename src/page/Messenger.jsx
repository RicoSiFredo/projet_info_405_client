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
import {  } from "react-bootstrap-icons";


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
                <div className="card chatMenuWrapper">
                        {conversations.map((c) => (
                            <Link className='text-decoration-none text-dark' to={"/message/"+c.id_str}>
                                <ConversationView key={c.id_str} conversation={c}/>
                            </Link>
                        ))}
                    <Button variant="outline-primary" onClick={addConv}>Nouvelle conversation</Button>
                </div>
            </div>
    
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    
                    {
                        (currentChat.id_str != -1) ?
                    (<>
                    <div className="chatBoxTop">
                    <h2>Conversation avec inserer le nom du mec putain</h2>
                    {currentChat.message_list.list.slice().reverse().map((m) => (
                        
                            <Message key={m.id_str} message={m} own={m.auteur.id_str === user.id_str}/>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Saisir ici votre message"
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
                    <h1>fdefderf</h1>
                </div>
            </div>

            <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Démarrer une nouvelle discussion</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <h6 className='mb-3'>Selectionner la personne avec qui vous souhaiter converser.</h6>
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
                        if (obj.id_str !== user.id_str && obj.firstname != undefined){
                            return (
                                <div className="mt-1 ms-3 mb-2 d-flex justify-content-between align-items-center">
                                    <Button variant="outline-primary" onClick={createConv}>{obj.getDisplayName()} </Button>
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