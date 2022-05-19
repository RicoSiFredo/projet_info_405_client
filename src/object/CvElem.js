import Object405 from "./base/ObjectEats";

export default class CvElem extends Object405 {
    have(comp){
        let res;
        if(comp==undefined){
            res = true;
        }
        else {
            let found = false;
            let i = 0;
            while(i<this.compList.size()&&!found){
                let compCC = this.compList.get(i);
                if(compCC.equals(comp)){
                    found = true;
                }
                i += 1;
            }
            res = found;
        }
        return res;
    }
} 