import SimpleEats from "./base/SimpleEats";
import CvElem from "./CvElem";

export default class Action extends CvElem {

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