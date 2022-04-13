import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";


export default class Message extends ObjectEats {

    static TYPE = "Message";

    text = undefined;
    auteur = new SimpleEats("send_msg", this);

    constructor(){ 
        super();
    }


    createMessage(failed, success){
        super.makeRequest(
            "user/create/message",
            {
                access_token: Data.accessToken(),
                senderId: this.id_str, 
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