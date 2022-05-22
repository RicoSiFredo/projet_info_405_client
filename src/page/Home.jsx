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

    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    const [listOffre, updateListOffre] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

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

    useEffect(function(){
        getOffres();
    }, [])
    listOffre.update = function(){
        updateListOffre(Eats.fakeUpdate(listOffre))
    }
    function getOffres(){
        listOffre.makeRequest(
            "get/offre",
            {
                access_token: Data.accessToken(),
            },
            function(error){
            },
            function(response){
            }
        )
    }
    
    console.log("caca")
    console.log(listOffre)

    function splitArrayIntoChunksOfLen(arr, len) {
        var chunks = [], i = 0, n = arr.length;
        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }
        return chunks;
      }

    
    let listGroup=splitArrayIntoChunksOfLen(list.list,3);
    let carouselProject;
    if (listGroup != undefined){
        carouselProject = <Carousel fade variant="dark" interval={3000}>
            {
                listGroup.map(function(group,i){

                    if(group.length >= 3){
                        return buildCarouselItem(group);
                    }
                    
                })
            }
        </Carousel>
    }

    let listGroupOffre=splitArrayIntoChunksOfLen(listOffre.list,3);
    let carouselOffre;
    if (listGroupOffre != undefined){
        carouselOffre = <Carousel fade variant="dark" interval={3000}>
            {
                listGroupOffre.map(function(group,i){

                    if(group.length >= 3){
                        return buildCarouselItem(group);
                    }
                    
                })
            }
        </Carousel>
    }

    function buildCarouselItem(troisProjets){
        //prends en parametre une liste de projets (3)
        //renvoie trois projets dans une div dans un carousel.item
        
        return <Carousel.Item className="d-flex justify-content-center">
            <div className="d-flex justify-content-center w-100 mb-5">
          
            <Link to={"/project/"+troisProjets[0].id_str} className="text-decoration-none ms-3 me-3 w-25" key={troisProjets[0].id_str}>
                <ProfilViewHome elem={troisProjets[0]} isProject={true}></ProfilViewHome>
            </Link>
                
            <Link to={"/project/"+troisProjets[1].id_str} className="text-decoration-none ms-3 me-3 w-25" key={troisProjets[1].id_str}>
                <ProfilViewHome elem={troisProjets[1]} isProject={true}></ProfilViewHome>
            </Link>
                            
            <Link to={"/project/"+troisProjets[2].id_str} className="text-decoration-none ms-3 me-3 w-25" key={troisProjets[2].id_str}>
                <ProfilViewHome elem={troisProjets[2]} isProject={true}></ProfilViewHome>
            </Link>
            
            </div>
        </Carousel.Item>

    }


    let bouton;
    if (user.logged){
        bouton = <Link to={"/profil/"+user.id_str} className="text-decoration-none">
            <Button variant="primary" className="pb-2">
                <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
            </Button>
        </Link>
    }else{
        bouton =  <Button variant="primary" className="pb-2">
                    <img className="img-btn" src={Constant.BASE_IMAGE+"plus.png"}/>
                </Button>
    }
    
    let homeText = <p className="titleOverImg">Trouvez les meilleurs offres d'emploi <br></br> pour votre carrière.</p>
    
    

    return <div>
                <div className="d-flex justify-content-around">
                    
                    <div className="w-100">
                        <Carousel fade className="bg-black">
                            <Carousel.Item >
                                <img 
                                    className="homeBanner"
                                    src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/38e35b05-a01d-4bc9-a5e7-168304e3ed72.png"}
                                    alt="First slide"
                                />
                                    <div className="centered">
                                        {homeText}
                                    </div>
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
                                    <div className="centered">
                                        {homeText}
                                    </div>
                                <Carousel.Caption>
                                    <div className="">
                                        <h4>Créer un projet {bouton}</h4>
                                        
                                    </div>
                                    <h6>Concevez et publiez votre projet pour être rejoins par des professionnels</h6>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="homeBanner"
                                    src={"http://os-vps418.infomaniak.ch:1187/l2_info_9_file/image/5671235c-6421-4450-bd32-92fba7496448.png"}
                                    alt="Third slide"
                                />
                                    <div className="centered">
                                        {homeText}
                                    </div>
                                <Carousel.Caption>
                                    <h4>Postuler !</h4>
                                    <h6>Proposez-vous dans un projet, si votre profil interesse le chef de projet, vous ferez partie de la team</h6>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    
                </div>

                <div className="m-5 p-2" >
                    <h2 className="m-2 mb-4">Découvrir des projets</h2>
                    <p className="ms-4 me-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum soluta eum quam unde corrupti facere magnam ea ut perspiciatis? Molestiae repellat assumenda neque at recusandae optio voluptatum nisi exercitationem unde.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum soluta eum quam unde corrupti facere magnam ea ut perspiciatis? Molestiae repellat assumenda neque at recusandae optio voluptatum nisi exercitationem unde.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum soluta eum quam unde corrupti facere magnam ea ut perspiciatis? Molestiae repellat assumenda neque at recusandae optio voluptatum nisi exercitationem unde.
                    </p>
                    <div className="ms-3 me-3 mb-3">
                    
                        {carouselProject}
                    
                    </div>

                </div>

                <div className="m-5 p-2">
                    <h2 className="m-2 mb-4">Découvrir des offres d'emploi </h2>
                    <p className="ms-4 me-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum soluta eum quam unde corrupti facere magnam ea ut perspiciatis? Molestiae repellat assumenda neque at recusandae optio voluptatum nisi exercitationem unde.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum soluta eum quam unde corrupti facere magnam ea ut perspiciatis? Molestiae repellat assumenda neque at recusandae optio voluptatum nisi exercitationem unde.
                    
                    </p>
                    <div className="ms-3 me-3 mb-3">
                    
                        {carouselOffre}
                    
                    </div>

                </div>
            </div>
}
export default Home;