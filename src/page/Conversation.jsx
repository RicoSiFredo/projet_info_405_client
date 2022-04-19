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
            if (friend != undefined) {
                return(
                    <div className="conversation">
                        <span className="conversationName">{friend.firstname}</span>
                        <Button variant="primary">Voir conv</Button>
                    </div>
                )

            }else{

        
            return(
            <p>Chargement</p>
            )
    }
        
    

   




}
export default Conversation;