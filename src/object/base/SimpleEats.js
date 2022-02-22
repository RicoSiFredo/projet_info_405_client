import { canApplyData } from "../../utils/Utils";
import BuildEats from "./BuildEats";
import ObjectEats from "./ObjectEats";

export default class SimpleEats extends ObjectEats {
    key = "";
    init = false;
    constructor(key, parent){
        super();
        this.key = key;
        this.parent = parent;
    }

    get(){
        return this;
    }
    applyData(json, parent){
        if(json[this.key]!=undefined&&json[this.key].length>0){
            if(this.init){
                super.applyData(json[this.key][0], parent);
            }
            else {
                if(canApplyData(this.parent, json)){
                    let temp = BuildEats.build(json[this.key][0]);
                    this.init = true;
                    super.copy(temp);
                    super.applyData(json[this.key][0], this.parent);
                }
            }
        }
        super.applyData(json, parent);
    }
    equals(elem){
        return elem[this.key] != undefined;
    }
}