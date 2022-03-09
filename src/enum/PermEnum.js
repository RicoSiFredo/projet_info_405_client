import EatsEnum from "../object/base/EatsEnum";

export default class PermEnum extends EatsEnum {
    static MANAGE_PROJECT = new PermEnum(0);
    static MANAGE_MEMBERS = new PermEnum(1);
    static MANAGE_ROLE = new PermEnum(2);
    constructor(name){
        super(name);
    }
}