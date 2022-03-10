import ListEats from "./base/ListEats";
import ObjectEats from "./base/ObjectEats";

export default class Role extends ObjectEats {

    static TYPE = "Role";

    name = undefined;
    root = undefined;

    permissionList = new ListEats("have_permission", this, undefined);

    constructor(){
        super();
    }
}