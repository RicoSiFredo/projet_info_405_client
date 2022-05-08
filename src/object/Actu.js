import Object405 from "./base/ObjectEats";

export default class Actu extends Object405 {
    
    static TYPE = "Actu";

    type = undefined;
    comment = undefined;
    date = undefined;
    price = undefined;

    constructor(){
        super();
    }

}