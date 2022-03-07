import Eats from "./Eats";

export default class ForeignEats extends Eats {

    elem = undefined;

    constructor(){
        super();
    }

    set(elem){
        this.elem = elem;
        if(this.elem.update!=undefined){
        }
    }

    setRecreate(elem){
        this.set(elem.recreate());
    }

    get(){
        return this.elem;
    }

    applyData(){

    }
    
    remove(){
        this.set(undefined);
    }

    isFinished(){
        return this.elem != undefined;
    }
    
    recreate(){
        let newElem = new ForeignEats();
        newElem.set(this.elem);
        return newElem;
    }
}