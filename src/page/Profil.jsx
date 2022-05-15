import { useEffect } from "react";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../list/ElemList";
import UserProjectList from "../list/UserProjectList";
import Data from "../utils/Data";
import Login from "./Login";
import React from "react"
import ProfilView from "../component/ProfilView";
import Elem from "../list/Elem";
import SkillView from "../component/ElemView";
import ElemView from "../component/ElemView";
import UserProjectView from "../component/UserProjectView";
import NotifList from "../list/NotifList";
import { useParams } from "react-router-dom";
import User from "../object/User";
import { useState } from "react";
import Eats from "../object/base/Eats";
import { Button, Form, Modal } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'

function Profil({rootUser}){
    const {id} = useParams();
    const [user, updateUser] = useState(new User());
    const [show, updateShow] = useState(false);
    const [rating, setRating] = useState(0)
    const [newComment,setNewComment] = useState("");
    

    user.id_str = id;
    function update(){
        updateUser(Eats.fakeUpdate(user));
        // fait croire à un changement
    }
    function handleClose() {
        updateShow(false);
    }
    function addNote() {
        updateShow(true);
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
          />
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        try{
            if (newComment != ("")){
                setNewComment("");
                rootUser.createComment(user.id_str,newComment,rating);    
            }

        }catch(err){
            console.log(err);
        }
    };
    user.update = update;
    useEffect(function(){
        user.getAllSkill();
        user.getAllProject();
        user.getNotif();
        user.getAllAction();
        user.getAllComment();
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
            
            <button className="btn btn-primary" onClick={addNote}>Ajouter un avis</button>
            <div>Commentaires : 
                {
                    user.commentList.list.map((obj, index) => {

                                return (
                                    <div className="Commentaires">
                                        Note : <Rating
                                            readonly={true}
                                            allowHover={false}
                                            ratingValue={obj.note} /* Available Props */
                                        /> <br />
                                        Commentaire : {obj.text} <br />
                                        écrit par : {obj.auteur.firstname} 
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


        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un avis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Note : <Stars />
                <br />Commentaire : <br />
                    <textarea className="CommentaireInput" placeholder="Laisser un avis..."
                    onChange={(e) => setNewComment(e.target.value)}
                    value={newComment}
                    ></textarea>
                </div>
                
                
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleSubmit}>Envoyer</button>
                <button className="btn btn-primary" onClick={handleClose}>Fermer</button>
            </Modal.Footer>
            
        </Modal>
    </div>
    }
    
}
export default Profil;