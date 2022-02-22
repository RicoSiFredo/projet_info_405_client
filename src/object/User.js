import Data from "../utils/Data";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";

export default class User extends ObjectEats {

    static TYPE = "User";

    firstname = undefined;
    lastname = undefined;
    description = undefined;

    skillList = new ListEats("got_skill", this);

    logged = false;

    constructor(){ 
        super();
    }

    logout(){
        Data.setAccessToken(undefined);
        Data.setRefreshToken(undefined);
        // supprime les tokens

        this.logged = false;
        // pas besoin de changer les autre attribut on y accède uniquement si logged == true

        if(this.update!=undefined){
            this.update();
        }
        // les données on changé si un fonction de mise a jour est definie on l'execute
    }

    login(response){
        this.logged = true;
        // l'utilisateur est mtn connecté

        Data.setAccessToken(response["result"]["access_token"]);
        Data.setRefreshToken(response["result"]["refresh_token"]);
        // change les tokens

        this.applyRequest(response);
        // applique les données de la requete a l'utilisateur automatiquement
        
        if(this.update!=undefined){
            this.update();
        }
        // les données on changé si un fonction de mise a jour est definie on l'execute
    }

    getAllSkill(failed, success){
        super.makeRequest(
            "user/get/skill",
            {
                access_token: Data.accessToken(),
                id: this.id_str
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