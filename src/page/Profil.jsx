import { useEffect } from "react";
import Data from "../utils/Data";
import React from "react"
import ProfilView from "../component/ProfilView";
import ElemView from "../component/ElemView";
import UserProjectView from "../component/UserProjectView";
import NotifList from "../list/NotifList";
import { useParams } from "react-router-dom";
import User from "../object/User";
import { useState } from "react";
import Eats from "../object/base/Eats";
import { Modal } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import HistoryView from "../component/HistoryView";

function Profil({rootUser}){
    const {id} = useParams();
    const [user, updateUser] = useState(new User());
    const [rating, setRating] = useState(0);
    

    user.id_str = id;
    function update(){
        updateUser(Eats.fakeUpdate(user));
        // fait croire à un changement
    }
    const Stars = () => {
         // initial rating value
      
        // Catch Rating value
        const handleRating = (rate) => {
          setRating(rate)
          // other logic
        }
      
        return (
            <Rating
                transition
                onClick={handleRating}
                ratingValue={rating} /* Available Props */
                allowHalfIcon={true}
            />
        )
    }
    user.update = update;
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
        user.getNotif();
        user.getAllAction();
        user.getAllComment();
        user.getAllHistory();
        user.getMoyenne();
    }, []);
    let canEdit = Data.isMe(user);
    if (Data.isMe(user)){
        return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView elem={user} isProject={false}></ProfilView>
            <ElemView 
                canEdit={canEdit} 
                parent={user}
                list={user.skillList} 
                keyword="skill"
                title="Compétences"
                infoNothing="Aucune compétences"
                infoNothingEdit="Commencer à ajouter des compétences">
                    
            </ElemView>
            <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden">
            Commentaires : <br /><br />
                {
                    user.commentList.list.map((obj, index) => {
                        return (
                            <div>
                                Note : <Rating
                                    readonly={true}
                                    allowHover={false}
                                    ratingValue={obj.note} /* Available Props */
                                /> <br />
                                Commentaire : {obj.text} <br />
                                écrit par : {obj.auteur.firstname}  <br /><br /><br />
                                
                            </div>            
                        )
                    })
                }
            </div>
        </div>
        <div className="w-45 center-div">
            <HistoryView 
                user={user}>

            </HistoryView>
        </div>
        <div className="w-25 right-div">
            <UserProjectView 
                user={user}>

            </UserProjectView>
        </div>
    </div>

    }else{
        return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView elem={user} isProject={false}></ProfilView>
            <ElemView 
                canEdit={canEdit} 
                parent={user}
                list={user.skillList} 
                keyword="skill"
                title="Compétences"
                infoNothing="Aucune compétences"
                infoNothingEdit="Commencer à ajouter des compétences">
                    
            </ElemView>
            
            <div>Commentaires : 
                {
                    user.commentList.list.map((obj, index) => {

                                return (
                                    <div className="Commentaires">
                                        Note : <Rating
                                            readonly={true}
                                            allowHover={false}
                                            ratingValue={obj.note} /* Available Props */
                                            allowHalfIcon={true}
                                        /> <br />
                                        Commentaire : {obj.text} <br />
                                        écrit par : {obj.auteur.firstname} <br />
                                        sur le projet : {obj.projet.name}
                                    </div>            
                                )
                            
                        
                    })
                }
            </div>
            

        </div>
        
        <div className="w-45 center-div">
            <NotifList
                rootUser={rootUser}
                user={user}
                you={false}
                list={user.notifList}>

            </NotifList>
        </div>
        <div className="w-25 right-div">
            <UserProjectView 
                user={user}>

            </UserProjectView>
        </div>
    </div>
    }
    
}
export default Profil;