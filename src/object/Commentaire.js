import Data from "../utils/Data";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";


export default class Commentaire extends Object405 {

    static TYPE = "Commentaire";

    text = undefined;
    note = undefined;
    auteur = new SimpleEats("send_comment", this);
    date = undefined;

    constructor(){ 
        super();
    }
    
}