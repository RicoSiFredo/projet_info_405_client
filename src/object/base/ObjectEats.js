import Constant from "../../utils/Constant";
import HTTP from "../../utils/HTTP";
import Utils from "../../utils/Utils";
import Eats from "./Eats";

export default class ObjectEats extends Eats {

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
    static fakeUpdate(base){
        let obj = {...base}
        Object.setPrototypeOf(obj, base)
        return obj;
    }
    canApplyDataDeep(json){
        return json["id_str"]!=undefined&&(this.id_str==undefined||this.id_str==json["id_str"]);
    }
    makeRequest(url, params, failed, success){
        let object = this;
        HTTP.queryPost(
            Constant.SERVER_URL + url,
            params,
            function(error){
                failed(error);
            }, 
            function(response){
                if(response["status"]=="success"){
                    object.applyRequest(response);
                    if(success!=undefined){
                        success(response);
                    }
                    if(object.update!=undefined){
                        object.update();
                    }
                }
            }
        )
    }
    applyRequest(response){
        let data = response["result"];
        let props = Object.keys(data);
        for(let i=0; i<props.length; i++){
            if(Array.isArray(data[props[i]])){
                for(let j=0; j<data[props[i]].length; j++){
                    this.applyData(data[props[i]][j], this.parent);
                }
            }
            else if(Utils.getType(data[props[i]])=="object"){
                this.applyData(data[props[i]], this.parent);
            }
        }
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
                                    this[props[i]] = json[propsJson[j]];
                                }
                            }
                        }
                    }
                }
            }
            for(let i=0; i<props.length; i++){
                if((this[props[i]]!=parent||parent==undefined)){
                    if(this[props[i]] instanceof Eats){
                        this[props[i]].applyData(json, this);
                    }
                }
            }
        }
    }
    equals(json){
        return json["id_str"] == this.id_str;
    }
}