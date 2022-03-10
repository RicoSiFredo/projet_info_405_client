import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Field from "./Field";

function SelectRole({updateRole, project}){
    const [val, updateVal] = useState("");
    const [create, updateCreate] = useState(false);
    const [list, updateList] = useState(new ListEats("own_role", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    useEffect(function(){
        list.makeRequest(
            "project/get/role",
            {
                access_token: Data.accessToken(),
                id: project.id_str
            },
            function(error){

            },
            function(response){

            }
        )
    }, []);

    function addRole(){
        list.makeRequest(
            "project/add/role",
            {
                access_token: Data.accessToken(),
                id_project: project.id_str,
                name: val
            },
            function(error){

            },
            function(response){

            }
        )
    }

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }

    function updateName(e){
        updateVal(e.target.value);
    }
    function startAdd(){
        updateCreate(!create);
    }

    let add;
    if(!create){
        add = <Button onClick={startAdd}>Ajouter un role</Button>
    } else {
        add = <div>
            <p>Ajouter un role :</p>
            <Field val={val} changeValue={updateName} label="Nom" name="name"></Field>
            <Button onClick={addRole}>Ajouter</Button><Button onClick={startAdd}>Annuler</Button>
        </div>
    }
    function selectRole(id){
        updateRole(id)
    }
    let listContent;
    if(list.size()==0){
        listContent = <div>
            <p>Aucun rôle, vous devez en ajouter un</p>
        </div>
    } 
    else {
        listContent = <div>
            {
                list.map(function(object, index){
                    if(object.root==undefined){
                        return <div key={object.id_str}>
                            <label>
                                <input onChange={function(){selectRole(object.id_str)}} name="radio" type="radio"/>
                                {object.name}
                            </label>
                        </div>
                    }
                })
            }
        </div>
    }
    return <div>
        {add}
        {listContent}
    </div>
}
export default SelectRole;