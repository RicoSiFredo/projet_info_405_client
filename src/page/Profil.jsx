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
import { Rating } from 'react-simple-star-rating'
import HistoryView from "../component/HistoryView";
import Constant from "../utils/Constant";
import { Link } from "react-router-dom";
import ProfilViewHome from "../component/ProfilViewHome";
import { EnvelopeFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

function Profil({rootUser}){
    const {id} = useParams();
    const [user, updateUser] = useState(new User());
    const [rating, setRating] = useState(0);
    let canEdit = Data.isMe(user);

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
        user.getBase()
        user.getAllSkill();
        user.getAllProject();
        user.getNotif();
        user.getAllAction();
        user.getAllComment();
        user.getAllHistory();
        user.getMoyenne();
    }, []);

    let text;
    if(user.commentList.size() == 0){
        text = <p className="mb-0">Aucun commentaires pour l'instant</p>
    }else{
        if(canEdit){
            text = <p className="mb-0">Il s'agit des avis laissés par d'autre professionnels au sujet de votre travail</p>
        }else{
            text = <p className="mb-0">Il s'agit des avis laissés par d'autre professionnels au sujet du travail de {user.firstname}</p>
        }
    }


    
    
    if (Data.isMe(user)){
        return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView rootUser={rootUser} elem={user} isProject={false}></ProfilView>
            <ElemView 
                canEdit={canEdit} 
                parent={user}
                rootUser={rootUser}
                list={user.skillList} 
                keyword="skill"
                title="Compétences"
                infoNothing="Aucune compétences"
                infoNothingEdit="Commencer à ajouter des compétences">
                    
            </ElemView>
            <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-3">
            <h4>Commentaires</h4>
                {text}
                {
                    user.commentList.list.map((obj, index) => {
                        let url = "/project/" + obj.projet.id_str;
                        return (
                            <div className="border-top border-dark pt-2 mt-2">
                                <p><strong>{obj.auteur.getDisplayName()}</strong> à émis un avis sur votre travail au sein du projet : {obj.projet.name}</p>
                                
                                <div className="d-flex justify-content-center">
                                            <Rating
                                                readonly={true}
                                                allowHover={false}
                                                ratingValue={obj.note} /* Available Props */
                                            />
                                </div>

                                <p className="mt-3">Observation : {obj.text} </p>
                                
                                <div className="mb-2 h-50">
                                    
                                    <Link className="text-decoration-none text-dark" to={url}>
                                        <ProfilViewHome elem={obj.projet} isProject={true}></ProfilViewHome>
                                    </Link>
            
                                </div>
                            </div>            
                        )
                    })
                }
            </div>
        </div>
        <div className="w-45 center-div">
            <HistoryView 
                user={user}
                rootUser={rootUser}>
                

            </HistoryView>
        </div>
        <div className="w-25 right-div">
            <div className="card pb-2 pt-2 ps-3 pe-2 mt-2 me-2 bg-light bg-gradient overflow-hidden d-flex justify-content-start" >
                <div className="d-flex">
                    <h4>Demande et invitation</h4>
                    <Link to={"/offre_user/"+user.id_str}>
                        <Button className="ms-2 mb-1 p-2 d-flex align-items-center justify-content-center" variant="primary">
                            <EnvelopeFill></EnvelopeFill>
                        </Button>
                    </Link>
                </div>
            </div>
            <UserProjectView 
                user={user}
                rootUser={rootUser}>

            </UserProjectView>
        </div>
    </div>

    }
    else{
        return <div className="d-flex justify-content-center flex-row">
        <div className="w-30 left-div">
            <ProfilView rootUser={rootUser} elem={user} isProject={false}></ProfilView>
            <ElemView 
                canEdit={canEdit} 
                parent={user}
                rootUser={rootUser}
                list={user.skillList} 
                keyword="skill"
                title="Compétences"
                infoNothing="Aucune compétences"
                infoNothingEdit="Commencer à ajouter des compétences">
                    
            </ElemView>
            
            <div className="card mt-2 ms-2 bg-light bg-gradient overflow-hidden pt-2 ps-3 pb-3 pe-3">
            <h4>Commentaires</h4>
            {text}
                {
                    user.commentList.list.map((obj, index) => {
                        let url = "/project/" + obj.projet.id_str;
                                return (
                                    <div className="border-top border-dark pt-2 mt-2">
                                        <p><strong>{obj.auteur.getDisplayName()}</strong> à émis un avis sur votre travail au sein du projet : {obj.projet.name}</p>
                                        
                                        <div className="d-flex justify-content-center">
                                            <Rating
                                                readonly={true}
                                                allowHover={false}
                                                ratingValue={obj.note} /* Available Props */
                                                allowHalfIcon={true}
                                            />
                                        </div>

                                        <p className="mt-3">Observation : {obj.text} </p>
                                        
                                        <div className="mb-2 h-50">
                                    
                                            <Link className="text-decoration-none text-dark" to={url}>
                                                <ProfilViewHome elem={obj.projet} isProject={true}></ProfilViewHome>
                                            </Link>
                    
                                        </div>
                                        
                                    </div>            
                                )
                            
                        
                    })
                }
            </div>
            

        </div>
        <div className="w-45 center-div">
            <HistoryView 
                user={user}
                rootUser={rootUser}>

            </HistoryView>
        </div>
        <div className="w-25 right-div">
            <div className="card pb-2 pt-2 ps-3 pe-2 mt-2 me-2 bg-light bg-gradient overflow-hidden d-flex justify-content-start" >
                <div className="d-flex">
                    <h4>Contacter</h4>
                    <Link to={"/message/171"}>
                        <Button className="ms-2 mb-1 p-2 d-flex align-items-center justify-content-center" variant="primary">
                            <EnvelopeFill></EnvelopeFill>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="card pb-2 pt-2 ps-3 pe-2 mt-2 me-2 bg-light bg-gradient overflow-hidden d-flex justify-content-start" >
                <div className="d-flex">
                    <h4>Demande et invitation</h4>
                    <Link to={"offre_user/"+user.id_str}>
                        <Button className="ms-2 mb-1 p-2 d-flex align-items-center justify-content-center" variant="primary">
                            <EnvelopeFill></EnvelopeFill>
                        </Button>
                    </Link>
                </div>
            </div>
            <UserProjectView 
                user={user}
                rootUser={rootUser}>

            </UserProjectView>
        </div>
    </div>
    }
    
}
export default Profil;