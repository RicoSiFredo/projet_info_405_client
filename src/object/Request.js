import SimpleEats from "./base/SimpleEats";
import CvElem from "./CvElem";

export default class Request extends CvElem {
 
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

    getStatue(){
        let heure = this.user.getCurrentHeure();
        if(heure==0){
            return 2;
        }
        else if(heure<=18){
            return 1;
        }
        else {
            return 0;
        }
    }

    getScoreStatue(){
        if(this.getStatue()==2){
            return 250;
        }
        else if(this.getStatue()==1){
            return 100;
        }
        else if(this.getStatue()==0){
            return 0;
        }
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

    getStatueTitle(){
        if(this.getStatue()==2){
            return "Libre";
        }
        else if(this.getStatue()==1){
            return "Partiel"
        }
        else if(this.getStatue()==0){
            return "Temps plien"
        }
    }

    getStatueBackground(){
        if(this.getStatue()==2){
            return "bg-success";
        }
        else if(this.getStatue()==1){
            return "bg-warning";
        }
        else if(this.getStatue()==0){
            return "bg-error";
        }
    }
}