import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";

export default class Project extends ObjectEats {

    static TYPE = "Project";

    name = undefined;
    description = undefined;
    date = undefined;

    actionList = new ListEats("act", this, CompareEats.compareInt("date", CompareEats.DESC));

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
}