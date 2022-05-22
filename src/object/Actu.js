import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";
import CvElem from "./CvElem";

export default class Actu extends CvElem {
    
    static TYPE = "Actu";

    fermer = undefined;
    name = undefined;
    descriptionProject = undefined;
    description = undefined;
    price = undefined;
    heure = undefined;
    start = undefined;
    end = undefined;
    date = undefined;

    project = new SimpleEats("have_actu", this);
    action = new SimpleEats("for_regie", this);
    compList = new ListEats("for_comp", this, CompareEats.compareInt("date", CompareEats.DESC))
    role = new SimpleEats("for_role", this)
    requestList = new ListEats("actu_req", this, CompareEats.compareInt("date", CompareEats.DESC))

    constructor(){
        super();
    }

    invite(user_id, failed, success){
        console.log(this)
        let obj = this;
        super.makeRequest(
            "actu/invite",
            {
                access_token: Data.accessToken(),
                actu_id: this.id_str,
                user_id: user_id
            },
            function(error){
                console.log(error)
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                console.log(response)
                console.log(obj)
                if(success!=undefined){
                    success(response);
                }
            }
        );
    }

    getRequestAll(failed, success){
        super.makeRequest(
            "actu/get/request",
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
        );
    }

    getBase(failed, success){
        super.makeRequest(
            "actu/get",
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
        );
    }

    postuler(comment, price, heure, start, end, failed, success){
        super.makeRequest(
            "actu/postuler",
            {
                access_token: Data.accessToken(),
                message: comment,
                start: start,
                heure: heure,
                end: end,
                price: price,
                id_actu: this.id_str,
                id_project: this.parent.id_str
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

    fermerFunc(failed, success){
        super.makeRequest(
            "actu/fermer",
            {
                access_token: Data.accessToken(),
                id_actu: this.id_str
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
        );
    }
}