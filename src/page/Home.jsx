import { Button, Carousel } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import React from "react"
import { Link } from "react-router-dom";
import Constant from "../utils/Constant";

function Home({user, navigate}){
    return <div>
            <div className="d-flex justify-content-around">
            <div className="card mt-4 me-5 ms-5 w-100">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img 
                            className="homeBanner"
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/4632d829-5da9-456b-8f81-aaa50b75e52e.jpg"}
                            alt="First slide"
                        />
                            <div class="centered"><p className="titleOverImg">Bienvenue</p></div>
                        <Carousel.Caption>
                            <h4>Pour commencer créer vous un compte</h4>
                            <h6>Personnalisez votre profil pour être le plus attractif possible<br></br>Montrez vos compétences</h6>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="homeBanner"
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/1f38497b-9c84-4da3-8cc2-a73661224da6.png"}
                            alt="Second slide"
                        />
                            <div class="centered"><p className="titleOverImg">Votre projet</p></div>
                        <Carousel.Caption>
                            <h4>Créer un projet</h4>
                            <h6>Concevez et publiez votre projet pour être rejoins par des professionnels</h6>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="homeBanner"
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/5671235c-6421-4450-bd32-92fba7496448.png"}
                            alt="Third slide"
                        />
                            <div class="centered"><p className="titleOverImg">Postuler !</p></div>
                        <Carousel.Caption>
                            <h4>Proposez-vous dans un projet</h4>
                            <h6>Si votre profil interesse le chef de projet, vous ferez partie de la team</h6>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
        <div className="card m-5">
            <h2>ICI METTRE LISTE DE PROJET</h2>
        </div>
        </div>
}
export default Home;