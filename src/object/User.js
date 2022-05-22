import Data from "../utils/Data";
import Utils from "../utils/Utils";
import CompareEats from "./base/CompareEats";
import ForeignEats from "./base/ForeignEats";
import ListEats from "./base/ListEats";
import Object405 from "./base/ObjectEats";

export default class User extends Object405 {

    static TYPE = "User";

    project = new ForeignEats();
    user = new ForeignEats();

    firstname = undefined;
    lastname = undefined;
    description = undefined;
    profile = undefined;
    banner = undefined;
    moyenne = undefined;
    birth = undefined;

    requestList = new ListEats("req_user", this, CompareEats.compareInt("date", CompareEats.DESC));
    haveActuList = new ListEats("have_actu", this);
    skillList = new ListEats("got_skill", this);
    actionList = new ListEats("do", this, CompareEats.compareInt("date", CompareEats.DESC));
    convList = new ListEats("is_member", this);
    notifList = new ListEats(["target", "view"], this);
    friendsList = new ListEats("friends", this);
    commentList = new ListEats("is_comment", this, CompareEats.compareInt("date", CompareEats.DESC));
    historyList = new ListEats("history", this, CompareEats.compareInt("date", CompareEats.DESC));
    cvList = new ListEats(["history","act"], this, CompareEats.compareInt("date", CompareEats.DESC));
    logged = false;

    constructor(){ 
        super();
    }

    have(comp){
        let res;
        if(comp==undefined){
            res = true;
        }
        else {
            let found = false;
            let i = 0;
            while(i<this.skillList.size()&&!found){
                let compCC = this.skillList.get(i);
                if(compCC.equals(comp)){
                    found = true;
                }
                i += 1;
            }
            res = found;
        }
        return res;
    }

    getDisplayName(){
        return this.firstname + " " + this.lastname;
    }

    logout(){
        Data.setAccessToken(undefined);
        Data.setRefreshToken(undefined);
        // supprime les tokens

        this.reset();
        // On retire ces attributs
        this.logged = false;
        // pas besoin de changer les autre attribut on y accède uniquement si logged == true

        Data.setUserId("");
        // change les tokens

        if(this.update!=undefined){
            this.update();
        }
        // les données on changé si un fonction de mise a jour est definie on l'execute
    }

    login(response){
        this.logged = true;
        // l'utilisateur est mtn connecté

        Data.setAccessToken(response["result"]["access_token"]);
        Data.setRefreshToken(response["result"]["refresh_token"]);
        // change les tokens

        this.applyRequest(response);
        // applique les données de la requete a l'utilisateur automatiquement
        
        Data.setUserId(this.id_str);
        // change les tokens

        if(this.update!=undefined){
            this.update();
        }
        // les données on changé si un fonction de mise a jour est definie on l'execute
        return true
    }
    getAllAction(failed, success){
        super.makeRequest(
            "user/get/action",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getNotif(failed, success){
        super.makeRequest(
            "user/get/notif",
            {
                access_token: Data.accessToken(),
                id_user: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getMyNotif(failed, success){
        super.makeRequest(
            "user/get/mynotif",
            {
                access_token: Data.accessToken()
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getAllSkill(failed, success){
        super.makeRequest(
            "user/get/skill",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getAllProject(failed, success){
        let obj = this;
        super.makeRequest(
            "user/get/project",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getAllConv(failed, success){
        super.makeRequest(
            "user/get/conversation",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    createMessage(failed, success){
        super.makeRequest(
            "user/create/message",
            {
                access_token: Data.accessToken(),
                senderId: this.id_str, 
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    createComment(receiverId,commentaire,projectId,note,failed, success){
        super.makeRequest(
            "user/create/commentaire",
            {
                access_token: Data.accessToken(), 
                receiverId: receiverId,
                commentaire: commentaire,
                projectId: projectId,
                note: note
                

            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getOffreAll(failed, success){
        super.makeRequest(
            "user/get/offre",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }

    getBase(failed, success){
        let obj = this;
        super.makeRequest(
            "user/get",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                console.log(obj);
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getAllHistory(failed, success){
        let obj = this;
        super.makeRequest(
            "user/get/history",
            {
                access_token: Data.accessToken(),
                id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                console.log(obj);
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getAllComment(failed, success){
        super.makeRequest(
            "user/get/commentaires",
            {
                access_token: Data.accessToken(),
                sender_id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getUserFriends(failed, success){
        super.makeRequest(
            "user/get/userFriends",
            {
                access_token: Data.accessToken(),
                idUser: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    createConversation(idFriend,failed, success){
        super.makeRequest(
            "user/create/conversation",
            {
                access_token: Data.accessToken(),
                senderId: this.id_str,
                receiverId: idFriend
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    }
    getMoyenne(failed, success){
        console.log("test1");
        console.log(this.id_str);
        super.makeRequest(
            "user/get/moyenneNotes",
            {
                access_token: Data.accessToken(),
                sender_id: this.id_str
            },
            function(error){
                if(failed!=undefined){
                    failed(error);
                }
            },
            function(response){
                if(success!=undefined){
                    success(response);
                }
            }
        )
    } 

    getCurrentHeure(){
        let heure = 0;
        for(let i=0;i<this.cvList.size();i++){
            let cv = this.cvList.get(i);
            let dateCc = Math.ceil(new Date().getTime() / 1000);
            if(cv.start<=dateCc&&cv.end>=dateCc){
                heure += cv.heure;
            }
        }
        return heure;
    }
    getFirstExp(comp){
        let res = Utils.currentDate();
        for(let i=0;i<this.cvList.size();i++){
            if(this.cvList.get(i).start<res&&this.cvList.get(i).have(comp)){
                res = this.cvList.get(i).start;
            }
        }
        return res
    }
    getLastExp(comp){
        let res = 0;
        for(let i=0;i<this.cvList.size();i++){
            if(this.cvList.get(i).end>res&&this.cvList.get(i).have(comp)){
                res = this.cvList.get(i).end;
            }
        }
        return res
    }
    getDuringExp(comp){
        let res = 0;
        for(let i=0;i<this.cvList.size();i++){
            if(this.cvList.get(i).have(comp)){
                res += this.cvList.get(i).end - this.cvList.get(i).start;
            }
        }
        return res
    }
    getAge(){
        return 18
    }

    getTotalExp(compList=undefined){
        if(compList==undefined||compList.length==0){
            let duree = 0;
            for(let i=0;i<this.cvList.size();i++){
                duree += this.cvList.get(i).end - this.cvList.get(i).start;
            }
            return Utils.currentDate() - duree;
        }
        else {
            let duree = 0;
            for(let i=0;i<this.cvList.size();i++){
                let found = false;
                let j = 0;
                while(!found&&j<compList.length){
                    let comp = compList[j];
                    if(this.cvList.get(i).have(comp)){
                        duree += this.cvList.get(i).end - this.cvList.get(i).start;
                        found = true;
                    }
                    j += 1;
                }
            }
            return Utils.currentDate() - duree;
        }
    }
    getAge(){
        if(this.birth==undefined){
            return 19
        }
        else {
            return Math.ceil((Utils.currentDate() - this.birth)/31536000);
        }
    }
    getTotalHeure(compList=undefined){
        if(compList==undefined||compList.length==0){
            let heure = 0;
            for(let i=0;i<this.cvList.size();i++){
                heure += this.cvList.get(i).getTotalHeure();
            }
            return heure
        }
        else {
            let heure = 0;
            for(let i=0;i<this.cvList.size();i++){
                let found = false;
                let j = 0;
                while(!found&&j<compList.length){
                    let comp = compList[j];;
                    if(this.cvList.get(i).have(comp)){
                        heure += this.cvList.get(i).getTotalHeure();
                        found = true;
                    }
                    j += 1;
                }
            }
            return heure
        }
    }
    
    moyenneFlat(){
        let res = 0;
        for(let i=0;i<this.commentList.size();i++){
            res += this.commentList.get(i).note;
        }
        if(this.commentList.size()!=0){
            return res/this.commentList.size();
        }
        else {
            return -1;
        }
    }
}

