export default class CompareEats { 
    static ASC = 0;
    static DESC = 1;
    static compareInt(field, type = this.ASC) {
        let coef = 1;
        if(type = this.DESC){
            coef = -1;
        }
        return function(a, b){
            if (a[field] < b[field]){
                return -1 * coef;
            }
            else if (a[field] > b[field]){
                return 1 * coef;
            }
            else {
                return 0;
            }
        }
    }
}