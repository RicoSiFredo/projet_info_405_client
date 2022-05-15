import Object405 from "./base/ObjectEats"
import SimpleEats from "./base/SimpleEats";

export default class Request extends Object405 {
 
    static TYPE = "Request";

    message = undefined;
    prix = undefined;

    user = new SimpleEats("req_user", this);

    getScore(){
        return this.getScoreComp()*100;
    }

    getScoreComp(){
        let listNeed = this.parent.compList;
        let listHave = this.user.skillList;
        let count = 0;;
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