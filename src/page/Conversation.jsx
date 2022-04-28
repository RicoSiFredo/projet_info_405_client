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
                let image = friend.banner;
                let ProfilPic = "http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/" + image;

                if (image !== undefined){
                    return(
                        <div className="conversation">
                            <img
                            className="conversationImg"
                            src={ProfilPic}
                            alt=""
                            />
                            <span className="conversationName">{friend.firstname}</span>
                        </div>
    
                    )
                }else{
                    return(
                        <div className="conversation">
                            <img
                            className="conversationImg"
                            src="profile_empty.png"
                            alt=""
                            />
                            <span className="conversationName">{friend.firstname}</span>
                        </div>
    
                    )
                }
                

            }else{

        
            return(
            <p>Chargement</p>
            )
    }
        
    

   




}
export default Conversation;