import CompareEats from "./base/CompareEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";
import SimpleEats from "./base/SimpleEats";

export default class Actu extends Object405 {
    
    static TYPE = "Actu";

    type = undefined;
    comment = undefined;
    date = undefined;
    price = undefined;
    duree = undefined;

    compList = new ListEats("for_comp", this, CompareEats.compareInt("date", CompareEats.DESC))
    role = new SimpleEats("for_role", this)

    constructor(){
        super();
    }

}