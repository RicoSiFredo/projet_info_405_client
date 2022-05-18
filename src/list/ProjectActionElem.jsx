import { Button, Modal, Alert } from "react-bootstrap";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import Data from "../utils/Data";
import React from "react"
import SimpleProfile from "../component/SimpleProfile";
import { ThreeDots } from "react-bootstrap-icons";
import { useState } from "react";
import PermEnum from "../enum/PermEnum";
import { Link } from "react-router-dom";
import ListEats from "../object/base/ListEats";
import ListRole from "../component/ListeRole";
import { Rating } from 'react-simple-star-rating'

function ProjectActionElem({user, updatePage, typeAction, project, action}){
    const [listConv, updateConv] = useState(new ListEats("", undefined));
    let [show, updateShow] = useState(false);
    const [showNotes, updateNotes] = useState(false);
    const [rating, setRating] = useState(0)
    const [newComment, setNewComment] = useState("");
    let [showRole, updateShowRole] = useState(false);
    let [verif, updateShowVerif] = useState(false);

    function handleCloseNote() {
        updateNotes(false);
    }
    function addNote() {
        updateNotes(true);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        
        try{
            if (newComment != ("")){
                setNewComment("");
                user.createComment(action.user.id_str,newComment,rating);    
            }

        }catch(err){
            console.log(err);
        }
    };

    function handleClose() {
        updateShow(false);
    }
    function openParam() {
        updateShow(true);
    }
    function openRole() {
        updateShowRole(true);
        handleClose();
    }
    function closeRole(){
        updateShowRole(false);
        openParam();
    }
    function closeVerif() {
        updateShowVerif(false);
    }
    function openVerif() {
        updateShowVerif(true);
    }

    function exclure(){
        project.makeRequest(
            'project/del/user',
            {
                id_project: project.id_str,
                id_user: action.user.id_str,
                access_token: Data.accessToken()
            },
            function(err){
                console.log(err)
            },
            function(response){
                console.log(response)
            }
        )
    }


    function openProfil(){
        action.user.update = project.update;
        user.user.set(action.user);
        updatePage(PageEnum.Profil);
    }
    
    let text;
    if (ActionEnum.IN_PROJECT.got(typeAction)){
        text = <p>Role : {action.role.name}</p>
        
    }
    let bonus;
    let button;
    if (ActionEnum.IN_PROJECT.got(typeAction) && !action.root){
        if (action.equals(project.action)){
            button = <Button className="m-1" onClick={openVerif}>Quitter le projet</Button>

        }
        else if(project.havePermission(PermEnum.MANAGE_MEMBERS)){
            button = <Button className="m-1" onClick={openVerif}>Exclure</Button>
        }
    }
    else if(ActionEnum.USER_ASK_TO_PROJECT.got(typeAction)){
        function accepter(){
            project.makeRequest(
                'project/add/user',
                {
                    id_project: project.id_str,
                    id_user: action.user.id_str,
                    access_token: Data.accessToken(),
                    description: "",
                },
                function(err){
                },
                function(response){
                }
            )
        }
        function refuser(){
            project.makeRequest(
                'project/del/user',
                {
                    id_project: project.id_str,
                    id_user: action.user.id_str,
                    access_token: Data.accessToken()
                },
                function(err){
                },
                function(response){
                }
            )
        }
        bonus = <div>
        <p>{action.description}</p>
        <Button onClick={accepter}>Accepter</Button>
        <Button onClick={refuser}>Refuser</Button>
        </div>

    }
    
    let test = "/message/-1";
    console.log(action.user);
    if (action.user.id_str != user.id_str){
        if (!project.isFinish){
            
            function showConv(){
                listConv.reset();
                listConv.makeRequest(
                    'user/get/conversationWithFriend', 
                    {
                        id: user.id_str,
                        id_friend: action.user.id_str 
                    },
                    function(error){
                    },
                    function(response){
                        test = test + listConv.list[0].convList.list[0].id_str;
                        console.log(test);
                        
                    }
                )
            }
            
            bonus =
            
            <div className="align-self-center flex ">
                <Button onClick={openParam} variant="primary">
                    <ThreeDots></ThreeDots>
                </Button>
                <Modal show={show} className="highest" onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Paramètres du membre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Selectionnez l'action
                        <div className="d-flex justify-content-center mt-2">
                            {button}
                            <Button className="m-1" variant="primary" onClick={handleClose}>
                                Noter
                            </Button>
                        
                            <Link to={test}>
                                <Button className="m-1" variant="primary" onClick={showConv}>Envoyer un message</Button>
                            </Link>
    
                            <Button className="m-1" variant="primary" onClick={openRole}>
                                Gerer le role
                            </Button>
                        </div>
                        <Alert variant="danger" show={verif} className="mt-3">
                            <Alert.Heading>Êtes-vous sûr de vous ?</Alert.Heading>
                            <Button className="m-1" variant="primary" onClick={exclure}>
                                    Valider
                                </Button>
                                <Button className="m-1" variant="outline-primary" onClick={closeVerif}>
                                    Annuler
                                </Button>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Retour
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    <Modal show={showRole} className="highest" onHide={closeRole} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Role du membre</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
    
    
                            <ListRole 
                                project={project}
                                action={action}
                            >
    
                            </ListRole>
                            
    
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={closeRole}>
                                Retour
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        }else{
            bonus =
            <div className="align-self-center flex ">
                <Button onClick={addNote} variant="primary">Noter</Button>

                <Modal show={showNotes} className="highest" onHide={handleCloseNote}>
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
                <button className="btn btn-primary" onClick={handleCloseNote}>Fermer</button>
            </Modal.Footer>
            
        </Modal>
            </div>
        }

        
        
    }else{
        if (!project.isFinish){
        bonus =
        <div className="align-self-center flex ">
			<Button onClick={openParam} variant="primary">
				<ThreeDots></ThreeDots>
			</Button>
            <Modal show={show} className="highest" onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Paramètres du membre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     Selectionnez l'action
                     <div className="d-flex justify-content-center mt-2">
                     {button}
                     </div>
                     <Alert variant="danger" show={verif} className="mt-3">
                        <Alert.Heading>Êtes-vous sûr de vous ?</Alert.Heading>
                        <Button className="m-1" variant="primary" onClick={exclure}>
                                Valider
                            </Button>
                            <Button className="m-1" variant="outline-primary" onClick={closeVerif}>
                                Annuler
                            </Button>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleClose}>
                        Retour
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        }
    }
    
    return <SimpleProfile
        user={user} 
        action={action} 
        updatePage={updatePage} 
        isProject={false}
        contentBonus={bonus}>

    </SimpleProfile>
}
export default ProjectActionElem;