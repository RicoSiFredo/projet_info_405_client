import { Button, Carousel } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import React from "react"
import { Link } from "react-router-dom";
import Holder from 'react-holder';
import Constant from "../utils/Constant";

function Home({user, navigate}){
    return <div className="d-flex justify-content-around">
            <div className="card mt-4 me-5 ms-5 w-100">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/91bc2cf3-a45d-4bb7-9f61-fbe3501d88b2.png"}
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
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/91bc2cf3-a45d-4bb7-9f61-fbe3501d88b2.png"}
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
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/91bc2cf3-a45d-4bb7-9f61-fbe3501d88b2.png"}
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