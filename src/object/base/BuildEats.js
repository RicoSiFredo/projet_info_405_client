import Skill from "../Skill";
import User from "../User";
import ObjectEats from "./ObjectEats";

export default class BuildEats {

    static build(json){
        let res;
        if(json==Skill.TYPE||json["_type"]==Skill.TYPE){
            res = new Skill();
        }
        else if(json==User.TYPE||json["_type"]==User.TYPE){
            res = new User();
        }
        else {
            res = new ObjectEats();
        }
        return res;
    }
}