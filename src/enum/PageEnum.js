import EatsEnum from "../object/base/EatsEnum";

export default class PageEnum extends EatsEnum {

    static HomeStr = "page_home"
    static LoginStr = "page_login"
    static RegisterStr = "page_register"
    static ProfilStr = "page_profil";
    static ProjectStr = "page_projet";
    static CreateProjectStr = "page_create_projet";
    static SearchProjectStr = "page_search_projet";

    static Home = new PageEnum(PageEnum.HomeStr);
    static Login = new PageEnum(PageEnum.LoginStr);
    static Register = new PageEnum(PageEnum.RegisterStr);
    static Profil = new PageEnum(PageEnum.ProfilStr);
    static Project = new PageEnum(PageEnum.ProjectStr);
    static CreateProject = new PageEnum(PageEnum.CreateProjectStr);
    static SearchProject = new PageEnum(PageEnum.SearchProjectStr);
    

    constructor(name) {
        super(name);
    }
}