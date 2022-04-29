import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import PageEnum from "../enum/PageEnum";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ErrorEats from "../object/base/ErrorEats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import Project from "../object/Project";
import React from "react"

function Search({search, back, user, updatePage}){
    const [name, updateName] = useState("");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    
    useEffect(function(){
        chercher();
    }, [search])

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    console.log(search)
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

    return <div>
       
        {
            list.map(function(object, index) {
                function openProfil(){
                    if (object instanceof Project){
                        user.project.set(object);
                        object.update = user.update;
                        updatePage(PageEnum.Project);
                    }else{
                        user.user.set(object);
                        object.update = user.update;
                        updatePage(PageEnum.Profil);
                    }
                    
                }
                return <div key={index}>
                    <p>{object.name == undefined ? object.firstname : object.name}</p> 
                    <Button onClick={openProfil} variant="primary">Voir</Button>
                </div>
            })
        }
    </div>
}
export default Search;

