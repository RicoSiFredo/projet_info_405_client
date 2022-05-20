import SortEnum from "../../enum/SortEnum";

export default class ComparatorCol {
    name = undefined;
    sort = undefined;
    compAsc = undefined;
    compDesc = undefined;
    fileter = undefined;
    array = undefined;
    constructor(name, sort=SortEnum.CANT, score=()=>0, fileter, array) {
        this.name = name;
        this.sort = sort;
        this.coef = 1;
        this.fileter = fileter;
        this.array = array;
        this.compAsc = function(a, b){
            return score(a, b) * 1;
        };
        this.compDesc = function(a, b){
            return score(a, b) * -1;
        };
    }
}