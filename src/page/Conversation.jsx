import { useEffect } from "react";
import { Button } from "react-bootstrap";
import React from "react"




function Conversation({conversation,updatePage}){
    const currentUser = conversation.parent;
    conversation.update = currentUser.update;

    useEffect(function(){
        conversation.getAllMembers();
        conversation.getAllMessages();
    }, []);

            const friend = (conversation.members.list.find((m) => m !== currentUser.id_str));

            let test = "http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/" + "83e999df-eda8-412a-8d54-73b8deb656fb.jpeg";
            if (friend != undefined) {
                return(
                    <div className="conversation">
                        <img
                        className="conversationImg"
                        src={test}
                        alt=""
                        />
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