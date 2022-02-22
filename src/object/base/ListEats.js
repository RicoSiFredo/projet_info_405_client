//import BuildEats from "./BuildEats";

import Utils from "../../utils/Utils";
import Eats from "./Eats";
import BuildEats from "./BuildEats";

export default class ListEats extends Eats {
    init = true;
    key = "";
    parent = undefined;
    compare = undefined;
    list = [];
    constructor(key, parent, compare){
        super();
        this.key = key;
        this.parent = parent;
        this.compare = compare;
    }
    map(func){
        return this.list.map(func);
    }
    size(){
        return this.list.length;
    }
    get(index){
        return this.list[index];
    }
    getList(){
        return this.list;
    }
    add(elem){
        this.list.push(elem);
        this.sort();
    }
    removeIndex(index){
        this.list.splice(index, 1);
    }
    remove(keys,values){
        if(typeof keys === "string"){
            for(let i=0; i<this.list.length; i++){
                if(this.list[i][keys]==values){
                    this.removeIndex(i);
                    i--;
                }
            }
        }
    }
    sort(){
        if(this.compare!=undefined){
            this.list.sort(this.compare);
        }
    }
    applyData(json, parent){
        if(!this.isFinished()){
            let can = Utils.canApplyData(parent, json);
            if(can){
                this.parent = parent;
                if(json[this.key]!=undefined){
                    for(let i=0; i<json[this.key].length;i++){
                        let found = false;
                        let index = 0;
                        let j = 0;
                        while(!found&&j<this.list.length){
                            if(this.list[j].equals(json[this.key][i])){
                                found = true;
                                index = j;
                            }
                            j++;
                        }
                        if(json[this.key][i]["id_del_str"]!=undefined){
                            if(found){
                                this.removeIndex(index);
                            }
                        }
                        else {
                            if(!found){
                                // add only if the elem is owned by the parent
                                let elem = BuildEats.build(json[this.key][i]);
                                elem.applyData(json[this.key][i], this.parent);
                                this.add(elem);
                            }
                            else {
                                this.list[index].applyData(json[this.key][i], this.parent);
                                this.sort();
                            }
                        }
                    }
                }
            }
            for (let i=0; i<this.list.length; i++){
                this.list[i].applyData(json, parent);
            }
        }
    }
    unselect(){
        for (let i=0; i<this.list.length; i++){
            this.list[i].select = false;
        }
    }
    getObject(elem){
        let found = false;
        let index = -1;

        let i = 0;

        while(!found&&i<this.list.length){
            if(this.list[i].equals(elem)){
                index = i;
                found = true;
            }
            i++;
        }

        return index;
    }
    select(elem){
        let index = this.getObject(elem);
        if(index!=-1){
            this.list[index].select = true;
        }
    }
    isSelect(elem){
        let res = false;
        let index = this.getObject(elem);
        if(index!=-1){
            res = this.list[index].select;
        }
        return res;

    }
    getSelect(){
        let found = false;
        let elem = undefined;

        let i = 0;

        while(!found&&i<this.list.length){
            if(this.list[i].select){
                elem = this.list[i];
                found = true;
            }
            i++;
        }
        return elem;
    }
}