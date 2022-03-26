import Message from "./Message";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddSkill from "../component/AddSkill";
import ProfilField from "../component/ProfilField";
import { ActionEnum } from "../enum/ActionEnum";
import PageEnum from "../enum/PageEnum";
import SkillList from "../object/list/SkillList";
import UserProjectList from "../object/list/UserProjectList";
import Data from "../utils/Data";
import HTTP from "../utils/HTTP";
import Constant from "../utils/Constant";
import ListEats from "../object/base/ListEats";



function Conversation(conversation,updatePage){
    const [user,setUser] = useState(null);

    

    console.log(conversation.conversation.id_str);
    
    return(
        <div className="conversation">

            <span className="conversationName">John Doe</span>
            
        </div>
    )



}
export default Conversation;