import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";

export default class Role extends Object405 {

    static TYPE = "Role";

    name = undefined;
    root = undefined;

    permissionList = new ListEats("have_permission", this, undefined);

    constructor(){
        super();
    }

    havePermission(perm){
        let found = false;
        let i = 0;
        if(this.init&&this.permissionList!=undefined){
            while(!found&&i<this.permissionList.size()){
                if(perm.is(this.permissionList.get(i).type)){
                    found = true;   
                }
                i++;
            }
        }
        return found;
    }
}