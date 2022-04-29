import Constant from "../../utils/Constant";
import HTTP from "../../utils/HTTP";
import Utils from "../../utils/Utils";
import Eats from "./Eats";

export default class Object405 extends Eats {

    init = true;

    id_str = undefined;
    _type = undefined;
    parent = undefined;
    update = undefined;
    select = false;
    start = false;
    load = false;

    constructor() {
        super();
    }
    canApplyDataDeep(json){
        return json["id_str"]!=undefined&&(this.id_str==undefined||this.id_str==json["id_str"]);
    }
    applyData(json, parent){
        if(!this.isFinished()){
            let can = this.canApplyDataDeep(json);
            // true the object have no id
            // true if the object has the same id of the json in parameters

            if(can&&parent!=undefined){
                this.parent = parent;
                if(this.update==undefined){
                    this.update = parent.update;
                }
            }

            let props = Object.keys(this);
            // get all properties of this object including propreties of child class

            if(can){
                for(let i=0; i<props.length; i++){
                    if(!(this[props[i]] instanceof Eats)&&
                    (this[props[i]]!=parent||parent==undefined)){
                        if(Array.isArray(this[props[i]])){
                            for(let i1=0;i1<this[props[i]].length; i1++){
                                if(this[props[i]][i1] instanceof Eats){
                                    this[props[i]][i1].applyData(json, this);
                                }
                            }
                        }
                        else {
                            let propsJson = Object.keys(json);
    
                            for(let j=0; j<propsJson.length;j++){
    
                                let elem = propsJson[j].substring(propsJson[j].indexOf('.') + 1);
                                if(props[i] == elem){
                                    if(Utils.isObject(json[propsJson[j]])&&json[propsJson[j]].low!=undefined&&json[propsJson[j]].high!=undefined) {
                                        this[props[i]] = json[propsJson[j]].low;
                                    }
                                    else {
                                        this[props[i]] = json[propsJson[j]];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(let i=0; i<props.length; i++){
                if((this[props[i]]!=parent||parent==undefined)){
                    if(this[props[i]] instanceof Eats&&
                        !this[props[i]].prevent){
                        
                        this[props[i]].applyData(json, this);
                        
                    }
                }
            }
        }
    }
    equals(json){
        return json != undefined && json["id_str"] == this.id_str;
    }
}