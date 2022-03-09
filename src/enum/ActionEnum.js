import EatsEnum from "../object/base/EatsEnum";

export class ActionEnum extends EatsEnum {
    static IN_PROJECT = new ActionEnum(0);
    static USER_ASK_TO_PROJECT = new ActionEnum(1);
    static PROJECT_ASK_TO_USER = new ActionEnum(2);
    static USER_REFUSE_TO_PROJECT = new ActionEnum(3);
    static PROJECT_ASK_TO_USER_REFUSE = new ActionEnum(4);
    constructor(name){
        super(name);
    }
}