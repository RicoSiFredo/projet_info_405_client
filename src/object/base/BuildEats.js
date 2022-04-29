import Message from "../Message";
import Conversation from "../Conversation";
import Action from "../Action";
import Permission from "../Permission";
import Project from "../Project";
import Role from "../Role";
import Skill from "../Skill";
import Tecno from "../Tecno";
import User from "../User";
import Object405 from "./ObjectEats";
import Notif from "../Notif";


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
        else if(json==Permission.TYPE||json["_type"]==Permission.TYPE){
            res = new Permission();
        }
        else if(json==Conversation.TYPE||json["_type"]==Conversation.TYPE){
            res = new Conversation();
        }
        else if(json==Message.TYPE||json["_type"]==Message.TYPE){
            res = new Message();
        }
        else if(json==Notif.TYPE||json["_type"]==Notif.TYPE){
            res = new Notif();
        }
        else {
            res = new Object405();
        }
        return res;
    }
}