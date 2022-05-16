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
            <Button className="m-1" variant="primary" onClick={login}>Connexion</Button>
            <Button className="m-1" variant="primary" onClick={register}>Inscription</Button>
        </div>
    }
    else {
        function logout(){
            navigate("/");
            user.logout();
        }
        button = <div >
            <Link to={"/"}>
                <Button className="m-1" variant="primary" onClick={logout}>Déconnexion</Button>
            </Link>
            <Link to={"/profil/"+user.id_str}>
                <Button className="m-1" variant="primary">Profil</Button>
            </Link>
            <Link to={"/message/-1"}>
                <Button className="m-1" variant="primary">Messages</Button>
            </Link>
        </div>
    }
    return <div>
                <div className="card m-2 p-2 d-flex align-items-center">
                    <h2 >Page d'accueil</h2>
                    {button}
                </div>
                
                <div className="card m-2 w-50">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="holder.js/800x600?text=Bienvenue&bg=f5f5f5"
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
                        src="holder.js/800x600?text=Selectionnez un projet&bg=eee"
                        alt="Second slide"
                        />
                        <Carousel.Caption>
                        <h5>Choisissez un projet</h5>
                        <p>Selectionnez le en fonction des tecnologies utilisés par exemple</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="holder.js/800x600?text=Postuler !&bg=e5e5e5"
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