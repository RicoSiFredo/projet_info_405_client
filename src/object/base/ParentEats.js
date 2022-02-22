import Eats from "./Eats";
import ForeignEats from "./ForeignEats";

export default class ParentEats extends ForeignEats {

    finished = false;

    constructor(key){
        super();
        this.key = key;
    }

    applyData(json, parent){             
        let fait = false;
        let temp = parent;

        while(!fait&&temp!=null){

            if(temp.constructor.TYPE == this.key){
                
                super.set(temp);
                
                this.finished = true;
            }

            temp = temp.parent;
        }
    }
    
    recreate(){
        return new ParentEats(this.key);
    }

    recreateEats(){
        return new ParentEats(this.key);
    }
}