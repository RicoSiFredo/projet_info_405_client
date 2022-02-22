export default class ErrorEats{

    static NO_ERROR_STR = "";
    static NO_ERROR = new ErrorEats(ErrorEats.NO_ERROR_STR);
    // L'erreur null

    static WENT_WRONG_STR = "went_wrong";
    static BAD_VALUE_STR = "bad_value";
    static EXIST_STR = "exist";
    static WRONG_PASSWORD_STR = "wrong_password";
    static NOT_FOUND_STR = "not_found";
    // Liste des erreur definie sur notre serveur

    static WENT_WRONG = new ErrorEats(ErrorEats.WENT_WRONG_STR);
    static BAD_VALUE = new ErrorEats(ErrorEats.BAD_VALUE_STR);
    static EXIST = new ErrorEats(ErrorEats.EXIST_STR);
    static WRONG_PASSWORD = new ErrorEats(ErrorEats.WRONG_PASSWORD_STR);
    static NOT_FOUND = new ErrorEats(ErrorEats.NOT_FOUND_STR);
    // Liste des erreur definie sur notre serveur
    
    constructor(name){
        this.name =  name;
    }

    toString() {
        let res;
        switch (this.name){
            case ErrorEats.WENT_WRONG_STR:
                res = "Une erreur s'est produite.";
                break;
            case ErrorEats.BAD_VALUE_STR:
                res = "Les données envoyées ne sont pas correcte.";
                break;
            case ErrorEats.EXIST_STR:
                res = "L'élément existe déjà.";
                break;
            case ErrorEats.WRONG_PASSWORD_STR:
                res = "Mauvais mot de passe.";
                break;
            case ErrorEats.NOT_FOUND_STR:
                res = "L'élément est introuvable.";
                break;
            case ErrorEats.NO_ERROR_STR:
                res = "";
                break;
            default:
                res = "Erreur inconnue.";
                break;
        }
        // liste des chaînes correspondant aux erreurs à enrichir selon la situation
        return res;
    }
}