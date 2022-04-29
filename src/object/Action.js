import CompareEats from "./base/CompareEats";
import Object405 from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Action extends Object405 {

    static TYPE = "Action";

    date = undefined;
    type = undefined;
    root = undefined;
    description = undefined;

    current_root = undefined;
    current_description = undefined;

    project = new SimpleEats("act", this);
    user = new SimpleEats("do", this);
    role = new SimpleEats("got_role", this);
    by = new SimpleEats("by", this);

    havePermission(perm){
        let res = false;
        if(this.role.init){
            res = this.role.havePermission(perm);
        }
        return res;
    }
}