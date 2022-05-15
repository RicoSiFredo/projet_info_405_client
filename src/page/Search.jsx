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

function Search({navigate, rootUser}){
    let {search} = useParams();
    if(search==undefined){
        search = ""
    }
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    const [type, updateType] = useState("");
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

    return <div>

            <Form.Select className="mb-3" aria-label="type" value={type} onChange={(e) => updateType(e.target.value)}>
                <option>Type</option>
                <option value="project">Projet</option>
                <option value="user">Utilisateur</option>
            </Form.Select>

            <Form.Group className="mb-3" controlId="min">
                <Form.Control value={min} onInput={eventMin} type="text" placeholder="Note minimum" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="max">
                <Form.Control value={max} onInput={eventMax} type="text" placeholder="Note maximum" />
            </Form.Group>

        {
            list.map(function(object, index) {
                function openProfil(){
                    if (object instanceof Project){
                        navigate("/project/" + object.id_str);
                    } else{
                        navigate("/profil/" + object.id_str);
                    }
                }
                
                    let div = <div key={index}>
                        <p>{object.name == undefined ? object.firstname : object.name}</p> 
                        <Button onClick={openProfil} variant="primary">Voir</Button>
                        </div>;
                    if (type == "") return div;
                    if (type == "project" && object instanceof Project) return div;
                    if (type == "user" && object instanceof User) return div;

            })
        }
    </div>
}
export default Search;

