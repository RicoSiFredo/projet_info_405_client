import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import Project from "../object/Project";
import User from "../object/User";
import Actu from "../object/Actu";
import React from "react"
import { useParams } from "react-router-dom";
import ProfilViewHome from "../component/ProfilViewHome";
import ActuElem from "../component/ActuElem";
import SelectCompetence from "../../src/component/SelectCompetence";

function Search({navigate, rootUser}){
    let {search} = useParams();
    if(search==undefined){
        search = ""
    }
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    const [type, updateType] = useState("");
    const [moy, updateMoy] = useState("");
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

    let filtreSkill;
    let filtreEtoile;
    if(type=="user") {
        
        filtreEtoile = <Form.Select className="w-85 m-2 p-2" aria-label="moy" value={moy} onChange={(e) => updateMoy(e.target.value)}>
        <option value="0">Nombres d'étoiles</option>
        <option value="20">1 étoile ou plus</option>
        <option value="40">2 étoile ou plus</option>
        <option value="60">3 étoile ou plus</option>
        <option value="80">4 étoile ou plus</option>
        <option value="100">5 étoile</option>
        </Form.Select>;
        filtreSkill = <SelectCompetence  
            className="w-85 m-2 p-2"
            compList={compList}
            updateCompList={updateCompList}
            type = "skill">
        </SelectCompetence>;
    } else if (type=="project") {
        filtreSkill = 
        <SelectCompetence  
            className="w-85 m-2 p-2"
            compList={tecnoList}
            updateCompList={updateTecnoList}
            type = "tecno">
        </SelectCompetence>
    } else if(type == "offre") {
        filtreSkill =
        <SelectCompetence  
        className="w-85 m-2 p-2"
        compList={compList}
        updateCompList={updateCompList}
        type = "skill">
    </SelectCompetence>;
    }

    return  <div className = "d-flex m-2 p-4">

            <div className="me-5 w-25">
                <p>Filtre de recherche</p>

                <Form.Select className="w-85 m-2 p-2" aria-label="type" value={type} onChange={(e) => updateType(e.target.value)}>
                    <option value="">Type</option>
                    <option value="project">Projet</option>
                    <option value="user">Utilisateur</option>
                    <option value="offre">Offre d'emploi</option>
                </Form.Select>

                {filtreEtoile}
                {filtreSkill}

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
                        
                    } else if (object instanceof Project) {
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
                    } else {
                        if(compList.every(function(s) {
                            for(let i = 0; i < object.compList.getList().length; i++ ) {
                                if (s.name == object.compList.getList()[i].name) {
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
                    
                    let div;
                    if(object instanceof Project || object instanceof User) {
                        div = <div key={index} className = "rounded w-100 Hgris border d-flex m-2 p-1 justify-content-between click" onClick={openProfil}>
                            <ProfilViewHome elem={object} isProject={object instanceof Project} note={note}></ProfilViewHome>
                        </div>;
                    } else {
                        div = <div key={index} className = "rounded w-100 Hgris border d-flex m-2 p-1 justify-content-between">
                            <ActuElem action={1} actu={object}></ActuElem>
                        </div>;
                    }

                    if (type == "" && note >= moy && boolComp) return div;
                    if (type == "project" && object instanceof Project && boolComp) return div;
                    if (type == "user" && object instanceof User && note >= moy && boolComp) return div;
                    if (type == "offre" && object instanceof Actu && boolComp) return div;
                    

            })
        }
        </div>
    </div>
}
export default Search;

