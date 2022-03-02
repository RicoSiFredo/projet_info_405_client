import { useState } from "react";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import SkillList from "../object/list/SkillList";

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
    return <div>
        <SkillList skillList={list}></SkillList>
    </div>
}
export default SkillBlock;