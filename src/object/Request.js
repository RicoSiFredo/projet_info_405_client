import Data from "../utils/Data";
import SimpleEats from "./base/SimpleEats";
import CvElem from "./CvElem";

export default class Request extends CvElem {
 
    static TYPE = "Request";

    refuse = undefined;
    pinned = undefined;
    message = undefined;
    price = undefined;
    accept = undefined;

    user = new SimpleEats("req_user", this);
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
    acceptFunc(){
        this.makeRequest(
            "request/accept",
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
        if(this.getStatue()==2){
            return 250;
        }
        else if(this.getStatue()==1){
            return 100;
        }
        else if(this.getStatue()==0){
            return 0;
        }
        else {
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
                    count += 250;
                    count += this.user.getTotalHeure([have])
                }
            }
        }
        return count;
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
            return "Temps plien - " + end;
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