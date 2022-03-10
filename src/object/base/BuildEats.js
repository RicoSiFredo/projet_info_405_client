import Action from "../Action";
import Project from "../Project";
import Role from "../Role";
import Skill from "../Skill";
import Tecno from "../Tecno";
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
        else if(json==Action.TYPE||json["_type"]==Action.TYPE){
            res = new Action();
        }
        else if(json==Project.TYPE||json["_type"]==Project.TYPE){
            res = new Project();
        }
        else if(json==Role.TYPE||json["_type"]==Role.TYPE){
            res = new Role();
        }
        else if(json==Tecno.TYPE||json["_type"]==Tecno.TYPE){
            res = new Tecno();
        }
        else {
            res = new ObjectEats();
        }
        return res;
    }
}