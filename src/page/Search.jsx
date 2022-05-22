import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import Project from "../object/Project";
import User from "../object/User";
import React from "react"
import { useParams } from "react-router-dom";
import Constant from "../utils/Constant";
import ImgProfile from "../../src/component/ImgProfile";
import { Rating } from 'react-simple-star-rating'
import ElemList from "../list/ElemList";
import ProfilViewHome from "../component/ProfilViewHome";
import SelectCompetence from "../../src/component/SelectCompetence";

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
    const [compList, updateCompList] = useState([]);
    const [tecnoList, updateTecnoList] = useState([]);

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

                <SelectCompetence  
                    className="w-85 m-2 p-2"
                    compList={compList}
                    updateCompList={updateCompList}
                    type = "skill">
                    
                </SelectCompetence>

                <SelectCompetence  
                    className="w-85 m-2 p-2"
                    compList={tecnoList}
                    updateCompList={updateTecnoList}
                    type = "tecno">
                </SelectCompetence>

                

                

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
                    console.log(compList);
                    let note;
                    let boolComp = false;

                    if(object instanceof User) {
                        if(compList.every(function(s) {
                            for(let i = 0; i < object.skillList.getList().length; i++ ) {
                                if (s.name == object.skillList.getList()[i].name) {
                                    return true;
                                }
                            }
                            return false;
                        })) {
                            boolComp = true;    
                        }
                        
                    } else {
                        if(tecnoList.every(function(s) {
                            for(let i = 0; i < object.tecnoList.getList().length; i++ ) {
                                if (s.name == object.tecnoList.getList()[i].name) {
                                    return true;
                                }
                            }
                            return false;
                        })) {
                            boolComp = true;    
                        }
                    }

                    if (object.moyenne == undefined) {
                        note = 0;
                    } else {
                        note = object.moyenne
                    }

                    let div = <div key={index} className = "rounded w-100 Hgris border d-flex m-2 p-1 justify-content-between click" onClick={openProfil}>
                                <ProfilViewHome elem={object} isProject={object instanceof Project} note={note}></ProfilViewHome>
                            </div>

                    if (type == "" && note >= moy && boolComp) return div;
                    if (type == "project" && object instanceof Project && boolComp) return div;
                    if (type == "user" && object instanceof User && note >= moy && boolComp) return div;
                    

            })
        }
        </div>
    </div>
}
export default Search;

