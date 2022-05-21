import { Button, Carousel } from "react-bootstrap";
import React from "react"
import { useEffect, useState } from "react";
import Data from "../utils/Data";
import ListEats from "../object/base/ListEats";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import { Link } from "react-router-dom";
import Constant from "../utils/Constant";
import ImgProfile from "../component/ImgProfile";
import ProfilViewHome from "../component/ProfilViewHome";

function Home({user, navigate}){




//++++++++++++++++++++++++++++++++++++++++++



//+++++++++++++++++++++++++++++++++++++++++++



    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    const [limite, updateLimite] = useState(10);

    useEffect(function(){
        getProject();
    }, [])
    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function getProject(){
        list.makeRequest(
            "fetch/project",
            {
                access_token: Data.accessToken(),
            },
            function(error){
            },
            function(response){
            }
        )
    }

    function expendLimit(){
        if (limite < list.size()){
            updateLimite(limite+10)
        }
    }
    let content = 
        <Carousel.Item className="d-flex center">
            <div className="d-flex justify-content-center w-100 mb-5" >
    {
        list.map(function(object, index){
            if (index < 3){
                return <Link to={"/project/"+object.id_str} className="text-decoration-none ms-3 me-3 w-25" key={object.id_str}>
                                <ProfilViewHome elem={object} isProject={true}></ProfilViewHome>
                        </Link>
            }
        })
    }
    </div>
    </Carousel.Item>
    



    let buttonPlus;
    if (limite < list.size()){
        buttonPlus = <Button variant="primary d-flex align-items-center" onClick={expendLimit} >
            Afficher plus
            <img className="img-btn ms-2" src={Constant.BASE_IMAGE + "plus.png"}/>
        </Button>
    }else{
        buttonPlus = <Button variant="primary d-flex align-items-center" disabled onClick={expendLimit} >
        Afficher plus
        <img className="img-btn ms-2" src={Constant.BASE_IMAGE + "plus.png"}/>
        </Button> 
    }

    return <div>



            <div className="d-flex justify-content-around">
            <div className="card mt-4 me-5 ms-5 w-100">
                <Carousel fade >
                    <Carousel.Item>
                        <img 
                            className="homeBanner"
                            src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/38e35b05-a01d-4bc9-a5e7-168304e3ed72.png"}
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
            <h2 className="m-2 mb-4">Découvrir des projets</h2>

            <div className="ms-3 me-3 mb-3">
                

                <Carousel variant="dark">
                    {content}
                </Carousel>

            </div>

        </div>
        </div>
}
export default Home;