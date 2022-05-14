import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Actu extends Object405 {
    
    static TYPE = "Actu";

    type = undefined;
    comment = undefined;
    date = undefined;
    price = undefined;
    duree = undefined;

    compList = new ListEats("for_comp", this, CompareEats.compareInt("date", CompareEats.DESC))
    role = new SimpleEats("for_role", this)

    constructor(){
        super();
    }

    postuler(message, prix){
        super.makeRequest(
            "actu/postuler",
            {
                access_token: Data.accessToken(),
                message: message,
                prix: prix,
                id_actu: this.id_str,
                id_project: this.parent.id_str
            },
            function(error){
                /*if(failed!=undefined){
                    failed(error);
                }*/
            },
            function(response){
                /*if(success!=undefined){
                    success(response);
                }*/
            }
        )
    }
}