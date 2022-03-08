import EatsEnum from "../object/base/EatsEnum";

export default class ProjectEnum extends EatsEnum {

    static HomeStr = "project_home"
    static AddStr = "project_add"

    static Home = new ProjectEnum(ProjectEnum.HomeStr);
    static Add = new ProjectEnum(ProjectEnum.AddStr);

    constructor(name) {
        super(name);
    }
}