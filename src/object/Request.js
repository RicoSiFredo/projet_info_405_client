import Data from "../utils/Data";
import Utils from "../utils/Utils";
import SimpleEats from "./base/SimpleEats";
import CvElem from "./CvElem";

export default class Request extends CvElem {
 
    static TYPE = "Request";

    pinned_user = undefined;
    invited = undefined;
    refuse = undefined;
    refuse_user = undefined;
    pinned = undefined;
    message = undefined;
    price = undefined;
    accept = undefined;

    user = new SimpleEats("req_user", this);
    actu = new SimpleEats("actu_req", this);
    conversation = new SimpleEats("local_conv", this);

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
    getPrice(){
        if(this.price!=undefined&&this.price!=''&&this.price!=0){
            return parseInt(this.price)
        }
        else {
            return parseInt(this.actu.price)
        }
    }
    getStart(){
        if(this.start!=undefined&&this.start!=''&&this.start!=0){
            return parseInt(this.start)
        }
        else if(this.actu.start!=undefined&&this.actu.start!=''&&this.actu.start!=0){
            return parseInt(this.actu.start)
        }
        else {
            return 0
        }
    }
    getEnd(){
        if(this.end!=undefined&&this.end!=''&&this.end!=0){
            return parseInt(this.end)
        }
        else if(this.actu.end!=undefined&&this.actu.end!=''&&this.actu.end!=0){
            return parseInt(this.actu.end)
        }
        else {
            return 0
        }
    }
    getNbComp(){
        let listNeed = this.parent.skillList;
        let listHave = this.actu.compList;
        let count = 0;
        for(let i = 0; i < listNeed.size(); i++){
            let need = listNeed.get(i);
            for(let j = 0; j < listHave.size(); j++){
                let have = listHave.get(j);
                if(need.equals(have)){
                    count += 250;
                }
            }
        }
        return count;
    }
    getTaille(){
        return this.actu.project.actionList.size()
    }
    getDuree(){
        if(this.getEnd()==0){
            return 5*60*60*24*7*52
        }
        else {
            return this.getEnd() - this.getStart()
        } 
    }
    getHeure(){
        if(this.heure!=undefined&&this.heure!=''&&this.heure!=0){
            return parseInt(this.heure)
        }
        else {
            return parseInt(this.actu.heure)
        }
    }
    pin(){
        this.makeRequest(
            "request/pin",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    unpin(){
        this.makeRequest(
            "request/unpin",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    pinUser(){
        this.makeRequest(
            "request/pin_user",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    unpinUser(){
        this.makeRequest(
            "request/unpin_user",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    unrefuseFunc(){
        this.makeRequest(
            "request/unrefuse",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    refuseFunc(){
        this.makeRequest(
            "request/refuse",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    unrefuseUserFunc(){
        this.makeRequest(
            "request/unrefuse_user",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    refuseUserFunc(){
        this.makeRequest(
            "request/refuse_user",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                
            },
            function(result){
                
            }
        )
    }
    acceptFunc(){
        this.makeRequest(
            "request/accept",
            {   
                "access_token": Data.accessToken(),
                "id_request": this.id_str
            },
            function(error){
                console.log(error)
            },
            function(result){
                console.log(result)
                
            }
        )
    }

    startConv(offre){
        if(this.conversation.init){
        }
        else {
            this.makeRequest(
                "user/create/conversation",
                {
                    "senderId": offre.action.user.id_str,
                    "receiverId": this.user.id_str,
                    "request": this.id_str
                },
                function(error){
                    
                },
                function(result){

                }
            )
        }
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

    getCoefExperience(){
        return this.getCoef("Expérience");
    }
    getCoefAge(){
        return this.getCoef("Age");
    }
    getCoefComp(){
        return this.getCoef("Compétences");
    }
    getCoefCommentaire(){
        return this.getCoef("Commentaire");
    }
    getCoefStatue(){
        return this.getCoef("Status");
    }
    getCoefSalaire(){
        return this.getCoef("Salaire");
    }
    getCoefTaille(){
        return this.getCoef("Taille");
    }
    getCoefHeure(){
        return this.getCoef("Heure");
    }
    getCoefDate(){
        return this.getCoef("Date");
    }

    getScoreUser(){
        return this.getTaille() * 100 * this.getCoefTaille() + this.getNbComp() * this.getCoefComp() * 5 + ( this.getDuree() * this.getCoefDate() ) / (60*60*24) + this.getHeure() * this.getCoefHeure() * -100 + this.getPrice() * this.getCoefSalaire();
    }

    getScore(){
        return this.getScoreComp()*this.getCoefComp() +
        this.getScoreStatue()*this.getCoefStatue()*5+
        this.getScoreSalaire()*this.getCoefSalaire()+
        this.getScoreCommentaire()*this.getCoefCommentaire()+
        this.getScoreExperience()*this.getCoefExperience()+
        this.getScoreAge()*this.getCoefAge() * 10;
    }

    getScoreSalaire(){
        let res;
        if(this.price==undefined){
            res = 0;
        }
        else {
            res = this.parent.price - this.price;
        }
        return res
    }
    
    getScoreAge(){
        let age = 100 - this.user.getAge();
        return age;
    }
    
    getScoreCommentaire(){
        return this.user.moyenneFlat() * 20 + this.user.commentList.size() * 10;
    }

    getScoreExperience(){
        return this.user.getTotalHeure();
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
        let res = (- Math.abs(this.getStatueAvanceDiffDay()) - Math.abs(this.getStatueRetardDiffDay())) * 3;
        if(this.getStatue()==2){
            res += 250;
        }
        else if(this.getStatue()==1){
            res +=  100;
        }
        else if(this.getStatue()==0){
            res +=  0;
        }
        else {
            res +=  0;
        }
        return res;
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
                    count += 250;
                    count += this.user.getTotalHeure([have])
                }
            }
        }
        return count;
    }

    getStatueAvance(){
        let res = "";
        if(this.start!=undefined&&this.start!=0&&this.start!=this.parent.start){
            res = "Commence le "+Utils.getDate(this.start, 0);
        }
        return res;
    }
    getStatueAvanceDiffDay(){
        let diff = 0;
        if(this.start!=undefined&&this.start!=0&&this.parent.start!=0&&this.parent.start!=undefined&&this.start!=this.parent.start){
            diff = this.start - this.parent.start;
            diff = Math.floor(diff/60/60/24);
        }
        return diff;
    }
    getStatueAvanceDiff(){
        let res = undefined;
        if(this.start!=undefined&&this.start!=0&&this.parent.start!=0&&this.parent.start!=undefined&&this.start!=this.parent.start){
            let diff = this.start - this.parent.start;
            diff = Math.floor(diff/60/60/24); 
            if(diff > 0){
                res = <span className="ms-1">( + {diff} j )</span>
            }
            else if(diff < 0){
                res = <span className="ms-1"> {diff} j</span>
            }
        }
        return res;
    }
    
    getStatueRetardDiffDay (){
        let diff = 0;
        if(this.end!=undefined&&this.end!=0&&this.parent.end!=0&&this.parent.end!=undefined&&this.end!=this.parent.end){
            diff = this.end - this.parent.end;
            diff = Math.floor(diff/60/60/24);
        }
        return diff;
    }
    getStatueRetardDiff(){
        let res = undefined;
        this.end = 1655226114;
        if(this.end!=undefined&&this.end!=0&&this.parent.end!=0&&this.parent.end!=undefined&&this.end!=this.parent.end){
            let diff = this.end - this.parent.end;
            diff = Math.floor(diff/60/60/24); 
            if(diff > 0){
                res = <span className="ms-1">( + {diff} j )</span>
            }
            else if(diff < 0){
                res = <span className="ms-1">( {diff} j )</span>
            }
        }
        return res;
    }
    getStatueRetard(){
        let res = "";
        if(this.end!=undefined&&this.end!=0&&this.end!=this.parent.end){
            res = "Fini le "+Utils.getDate(this.end, 0);
        }
        return res;
    }
    getStatueTitle(){
        let end = parseInt(this.user.getCurrentHeure(), 10) + " h"
        if(this.getStatue()==2){
            return "Libre";
        }
        else if(this.getStatue()==1){
            return "Partiel - " + end;
        }
        else if(this.getStatue()==0){
            return "Temps plein - " + end;
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
            return "bg-danger";
        }
    }
}