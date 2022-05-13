import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Field from "./Field";

function SelectRole({project, updateRole}){
    const [search, updateSearch] = useState("");
    
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    useEffect(function(){
        chercher();
    }, [search])
    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercher(){
        list.reset();
        list.makeRequest(
            'project/search/role', 
            {
                access_token: Data.accessToken(),
                id: project.id_str,
                name: search,
            },
            function(error){
            },
            function(response){
            }
        )
    }
    
    function changeSearch(e){
        updateSearch(e.target.value);
    }
    useEffect(function(){
        project.getAllRole();
    }, []);
    return <div key={`inline-radio`} className="mt-2">
        <Field className={"mt-2 mb-2"} val={search} changeValue={changeSearch} label="Chercher un rôle" name="search_role"></Field>
        {
            list.map((role, index) =>
                <Form.Check
                    key={role.id_str}
                    inline
                    onChange={() => updateRole(role.id_str)}
                    label={role.name}
                    name={"select_role"}
                    type={"radio"}
                    id={`inline-radio-`+role.id_str}
                />
            )
        }
    </div>
}
export default SelectRole;