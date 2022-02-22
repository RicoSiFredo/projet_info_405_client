export default class Eats{
    
    finished = false;
    update = undefined;

    constructor(){
    }

    saveParent(){
        let arr = [];
        let props = Object.keys(this);
        for(let i=0; i<props.length; i++){
            if(props[i]=="parent"||
            (this[props[i]] instanceof Eats&&
                this[props[i]].isFinished())){
                arr.push({
                    key: props[i],
                    value: this[props[i]]
                });
            }
        }
        return arr;
    }

    isFinished(){
        return this.finished;
    }

    deleteElem(arr){
        for(let i=0; i<arr.length; i++){
            delete this[arr[i]["key"]];
        }
    }

    assignElem(arr){
        for(let i=0; i<arr.length; i++){
            this[arr[i]["key"]] = arr[i]["value"];
        }
    }

    copy(temp){
        Object.assign(this, temp);
        Object.setPrototypeOf(this, temp.constructor.prototype);
    }

    applyData(){}

    recreate(){
        let res = new Eats();

        let allParent = this.saveParent();
        this.deleteElem(allParent);

        Object.assign(res, this);
        Object.setPrototypeOf(res, this.constructor.prototype);

        let props = Object.keys(this);

        for(let i=0; i<props.length; i++){
            if(this[props[i]] instanceof Eats){
                res[props[i]] = this[props[i]].recreate();
            }
            else if(Array.isArray(this[props[i]])){
                res[props[i]] = [];
                for(let j=0;j<this[props[i]].length; j++){
                    if(this[props[i]][j] instanceof Eats){
                        res[props[i]].push(this[props[i]][j].recreate());
                    }
                    else {
                        res[props[i]].push(this[props[i]][j]);
                    }
                }
            }
            else {
                res[props[i]] = this[props[i]];
            }
        }

        res.assignElem(allParent);
        this.assignElem(allParent);

        return res;
    }
}