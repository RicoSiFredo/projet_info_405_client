import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";


export default class Conversation extends ObjectEats {

    static TYPE = "Conversation";

    members = new ListEats("is_member", this);
    message = new ListEats("send_msg", this);

    constructor(){ 
        super();
    }

    getAllMembers(failed, success){
        super.makeRequest(
            "user/get/members",
            {
                access_token: Data.accessToken(),
                idConv: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getAllMessages(failed, success){
        super.makeRequest(
            "user/get/message",
            {
                access_token: Data.accessToken(),
                idConv: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
}