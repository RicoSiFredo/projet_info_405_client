import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";
import ForeignEats from "./base/ForeignEats";
import SimpleEats from "./base/SimpleEats";

export default class Project extends ObjectEats {

    static TYPE = "Project";

    action = new SimpleEats("me", this);

    name = undefined;
    description = undefined;
    date = undefined;

    actionList = new ListEats("act", this, CompareEats.compareInt("date", CompareEats.DESC));

    havePermission(perm){
        let res;
        if(!this.action.init||this.action.type!=0){
            res = false;
        }
        else {
            res = true;
        }
        return res;
    }
    

    actionType(actionType){
        let res;
        if(this.action.init){
            res = actionType.is(this.action.type);
        }
        else {
            res = false;
        }
        return res;
    }

    isIn(){
        return this.action.init && this.action.type == 0
    }

    getBase(failed, success){
        let obj = this;
        super.makeRequest(
            "project/get",
            {
                access_token: Data.accessToken(),
                id: this.id_str
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
        )
    }
    getAllAction(failed, success){
        super.makeRequest(
            "project/get/action",
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

    getAllTecno(failed, success){
        super.makeRequest(
            "/project/get/tecno",
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