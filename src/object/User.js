import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";

export default class User extends ObjectEats {

    static TYPE = "User";

    project = new ForeignEats();
    user = new ForeignEats();

    firstname = undefined;
    lastname = undefined;
    description = undefined;
    profile = undefined;
    banner = undefined;

    skillList = new ListEats("got_skill", this);
    actionList = new ListEats("do", this, CompareEats.compareInt("date", CompareEats.DESC));
    convList = new ListEats("is_member", this);
    notifList = new ListEats(["target", "view"], this);
    logged = false;

    constructor(){ 
        super();
    }

    logout(){
        Data.setAccessToken(undefined);
        Data.setRefreshToken(undefined);
        // supprime les tokens

        this.reset();
        // On retire ces attributs
        this.logged = false;
        // pas besoin de changer les autre attribut on y accède uniquement si logged == true

        Data.setUserId("");
        // change les tokens

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
        
        Data.setUserId(this.id_str);
        // change les tokens

        if(this.update!=undefined){
            this.update();
        }
        // les données on changé si un fonction de mise a jour est definie on l'execute
        return true
    }

    getNotif(failed, success){
        super.makeRequest(
            "user/get/notif",
            {
                access_token: Data.accessToken(),
                id_user: this.id_str
            },
            function(error){
                console.log(error)
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
    getMyNotif(failed, success){
        super.makeRequest(
            "user/get/mynotif",
            {
                access_token: Data.accessToken()
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

    getAllProject(failed, success){
        let obj = this;
        super.makeRequest(
            "user/get/project",
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
                console.log(obj)
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getAllConv(failed, success){
        super.makeRequest(
            "user/get/conversation",
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

