import { Button, Carousel } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import React from "react"
import { Link } from "react-router-dom";
import Holder from 'react-holder';

function Home({user, navigate, updatePage}){
    let button;
    if(!user.logged){
        function login(){
            navigate("/login");
        }
        function register(){
            navigate("/register");
        }
        button = <div >
            <Button className="m-1" variant="primary" size="lg" onClick={login}>Connexion</Button>
            <Button className="m-1" variant="primary" size="lg" onClick={register}>Inscription</Button>
        </div>
    }
    else {
        function logout(){
            navigate("/");
            user.logout();
        }
        button = <div>
            
        </div>
    }
    return <div className="d-flex justify-content-around">
                <div className="card mt-3 ms-3 d-flex align-items-center p-2">
                    <h2 className="m-3">Page d'accueil</h2>
                    {button}
                </div>
                
                
                    <div className="card mt-3 me-3 w-75">
                        <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="holder.js/800x550?text=Bienvenue&bg=f5f5f5"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h5>Pour commencer créer vous un compte</h5>
                                <p>Personnalisez votre profil pour être le plus attractif possible<br></br>Montrez vos compétences</p>
                                
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="holder.js/800x550?text=Selectionnez un projet&bg=eee"
                                alt="Second slide"
                                />
                                <Carousel.Caption>
                                <h5>Créer un projet</h5>
                                <p>Concevez et publiez votre projet pour être rejoins par des professionnels</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="holder.js/800x550?text=Postuler !&bg=e5e5e5"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                <h5>Proposez-vous dans un projet</h5>
                                <p>Si votre profil interesse le chef de projet, vous ferez partie de la team</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                
            </div>
}
export default Home;