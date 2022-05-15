import Object405 from "./base/ObjectEats"
import SimpleEats from "./base/SimpleEats";

export default class Request extends Object405 {
 
    static TYPE = "Request";

    message = undefined;
    prix = undefined;

    user = new SimpleEats("req_user", this);

    getCol(name){
        let col = undefined;
        if(this.colList!=undefined){
            for(let i = 0; i < this.colList.length; i++){
                let c = this.colList[i];
                if(c.name == name){
                    col = c;
                }
            }
        }
        return col;
    }

    getCoef(name){
        if(this.colList!=undefined){
            let col = this.getCol(name)
            return col.coef;
        }
        else {
            return 1;
        }
    }

    getCoefComp(){
        return this.getCoef("Compétences");
    }

    getScore(){
        return this.getScoreComp()*this.getCoefComp()*100;
    }

    getScoreComp(){
        let listNeed = this.parent.compList;
        let listHave = this.user.skillList;
        let count = 0;
        for(let i = 0; i < listNeed.size(); i++){
            let need = listNeed.get(i);
            for(let j = 0; j < listHave.size(); j++){
                let have = listHave.get(j);
                if(need.equals(have)){
                    count++;
                }
            }
        }
        return count;
    }
}