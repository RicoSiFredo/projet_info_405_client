export default class Utils {
    static getType(p) {
        // recupère le type de l'object
        let res;
        if (Array.isArray(p)){
            res = 'array';
        }
        else if (typeof p == 'string') {
            res = 'string';
        }
        else if (p != null && typeof p == 'object') {
            res = 'object';
        }
        else {
            res = 'other';
        }
        return res;
    }
    
    static canApplyData(obj, json){
        return json["id_str"]!=undefined&&(obj.id_str==undefined||obj.id_str==json["id_str"]);
    }
    static isObject(obj){
        return typeof obj === 'object' &&
        !Array.isArray(obj) &&
        obj !== null
    }
}