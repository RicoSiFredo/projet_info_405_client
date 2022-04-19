import { useState } from "react";
import ListEats from "../object/base/ListEats";
import SkillList from "../object/list/SkillList";
import React from "react"

function SkillBlock(){
    const [list, updateList] = useState(new ListEats("", this))
    useState(function(){
        list.makeRequest(
            "skill/get", 
            {},
            function(){
                refresh();
            })
    }, []);
    function refresh(){
        updateList(ListEats.fakeUpdate(list));
    }
    if(list!=undefined){   
        return <div>
            <SkillList skillList={list}></SkillList>
        </div>
    }
    else {
        return <div></div>
    }
}
export default SkillBlock;