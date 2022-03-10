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

    got(array){
        let found = false;
        let i = 0;
        while(!found&&i<array.length){
            found = array[i].equals(this); 
            i++;
        }
        return found;
    }

    is(name){
        return name == this.name;
    }

    static recreate(obj){
        return new EatsEnum(obj.name);
    }
}