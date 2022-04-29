import PermEnum from "../enum/PermEnum";
import Object405 from "./base/ObjectEats";

export default class Permission extends Object405 {

    static TYPE = "Permission";

    type = undefined;

    constructor(){
        super();
    }

    enum(){
        return new PermEnum(this.type);
    }
    text(){
        let res = "Pas défini"
        let en = this.enum();
        if(en.equals(PermEnum.MANAGE_MEMBERS)){
            res = "Gérer les participants"
        }
        else if(en.equals(PermEnum.MANAGE_PROJECT)){
            res = "Gérer le projet"
        }
        else if(en.equals(PermEnum.MANAGE_ROLE)){
            res = "Gérer les rôles"
        }
        return res;
    }
}