import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";


export default class Message extends ObjectEats {

    static TYPE = "Message";

    text = undefined;
    auteur = new ListEats("member", this);

    constructor(){ 
        super();
    }

    getMessageWriter(failed, success){
        super.makeRequest(
            "user/get/messageWriter",
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