import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import ForeignEats from "./base/ForeignEats";
import SimpleEats from "./base/SimpleEats";

export default class Project extends Object405 {

    static TYPE = "Project";

    action = new SimpleEats("me", this);

    name = undefined;
    description = undefined;
    profile = undefined;
    banner = undefined;
    date = undefined;
    isFinish = undefined;

    permissionList = new ListEats("", undefined, CompareEats.compareInt("type", CompareEats.ASC), "", true)
    haveActuList = new ListEats("have_actu", this)

    roleList = new ListEats("own_role", undefined, CompareEats.compareInt("date", CompareEats.DESC))
    tecnoList = new ListEats("use", this);
    actionList = new ListEats("act", this, CompareEats.compareInt("date", CompareEats.DESC));
    memberList = new ListEats("members", this);
    conv= new SimpleEats("conv", this);

    havePermission(perm){
        let res;
        if(!this.action.init||this.action.type!=0){
            res = false;
        }
        else {
            res = this.action.root || this.action.havePermission(perm);
        }
        return res;
    }
    
    getDisplayName(){
        return this.name;
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
    getHaveActuList(failed, success){
        let obj = this;
        this.makeRequest(
            "project/get/actu",
            {
                id: this.id_str,
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
    getAllPermission(failed, success){
        let obj = this;
        this.permissionList.makeRequest(
            "permission/get",
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
            "project/get/tecno",
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
    getAllRole(failed, success){
        super.makeRequest(
            "project/get/role",
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
    getAllMembers(failed, success){
        super.makeRequest(
            "user/get/projectMembers",
            {
                idProject: this.id_str
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
    getConv(failed, success){
        super.makeRequest(
            "user/get/conversationProject",
            {
                idProject: this.id_str
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