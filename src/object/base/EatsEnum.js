export default class EatsEnum{
    constructor(name) {
        this.name = name
    }

    equals(obj){
        let res;
        if(obj instanceof EatsEnum){
            res = obj.name == this.name;
        }
        else {
            res = false;
        }
        return res;
    }

    static recreate(obj){
        return new EatsEnum(obj.name);
    }
}