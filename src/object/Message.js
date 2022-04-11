import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import List from "./list/List";

export default class Message extends ObjectEats {

    static TYPE = "Message";

    message = new ListEats("send_msg", this);

    constructor(){ 
        super();
    }

    getMessagesConv(failed, success){
        super.makeRequest(
            "user/get/messagesUser",
            {
                access_token: Data.accessToken(),
                idMessage: this.id_str
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