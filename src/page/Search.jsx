import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Field from "../component/Field";
import PageEnum from "../enum/PageEnum";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ErrorEats from "../object/base/ErrorEats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import Project from "../object/Project";
import User from "../object/User";
import React from "react"
import { useParams } from "react-router-dom";
import Constant from "../utils/Constant";
import ImgProfile from "../../src/component/ImgProfile";
import { Rating } from 'react-simple-star-rating'

function Search({navigate, rootUser}){
    let {search} = useParams();
    if(search==undefined){
        search = ""
    }
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    const [type, updateType] = useState("");
    const [moy, updateMoy] = useState("");
    const [min, updateMin] = useState("");
    const [max, updateMax] = useState("");

    console.log(type);
    useEffect(function(){
        chercher();
    }, [search])
    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercher(){
        list.reset();
        list.makeRequest(
            'search/element', 
            {
                name: search,
            },
            function(error){
            },
            function(response){
                console.log(response)
            }
        )
    }


    function eventMin(e){
        updateMin(e.target.value);
    }
    function eventMax(e){
        updateMax(e.target.value);
    }

    return <div className = "d-flex m-2 p-4">

            <div className="me-5">
                <p>Filtre de recherche</p>

                <Form.Select className="w-85 m-2 p-2" aria-label="type" value={type} onChange={(e) => updateType(e.target.value)}>
                    <option value="">Type</option>
                    <option value="project">Projet</option>
                    <option value="user">Utilisateur</option>
                </Form.Select>

                <Form.Select className="w-85 m-2 p-2" aria-label="moy" value={moy} onChange={(e) => updateMoy(e.target.value)}>
                    <option value="0">Nombres d'étoiles</option>
                    <option value="20">1 étoile ou plus</option>
                    <option value="40">2 étoile ou plus</option>
                    <option value="60">3 étoile ou plus</option>
                    <option value="80">4 étoile ou plus</option>
                    <option value="100">5 étoile</option>
                </Form.Select>

                

            </div>
            <div>
                


        {
            list.map(function(object, index) {
                function openProfil(){
                    if (object instanceof Project){
                        navigate("/project/" + object.id_str);
                    } else{
                        navigate("/profil/" + object.id_str);
                    }
                }
                    let div = <div key={index} className = "border d-flex m-2 p-1 justify-content-between" >
                            <div className="banner border-bottom border-4 border-primary">
                                
                                {object.profile != undefined ? <img src={Constant.IMAGE_URL+object.profile} className="center-crop w-100 h-100" alt=""/> :  <ImgProfile className="center-crop w-100 h-100" elem={object}></ImgProfile>}
                        </div>
                        <div>
                            <p className="m-4">{object.name == undefined ? object.firstname : object.name}</p>
                            <p className = "mt-4 m-2">{object.description}</p> 
                            <Rating
                                            readonly={true}
                                            allowHover={false}
                                            ratingValue={object.moyenne} /* Available Props */
                                            allowHalfIcon={true}/>
                        </div>
                        <Button className = "h-50 m-4" onClick={openProfil} variant="primary">Voir</Button>
                        </div>;
                    if (type == "" && object.moyenne >= moy) return div;
                    if (type == "project" && object instanceof Project) return div;
                    if (type == "user" && object instanceof User && object.moyenne >= moy) return div;

            })
        }
        </div>
    </div>
}
export default Search;

