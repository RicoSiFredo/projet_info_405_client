import EatsEnum from "../object/base/EatsEnum";

export default class PageEnum extends EatsEnum {

    static HomeStr = "page_home"
    static LoginStr = "page_login"
    static RegisterStr = "page_register"
    static ProfilStr = "page_profil";
    static ProjectStr = "page_projet";
    static CreateProjectStr = "page_create_projet";
    static SearchStr = "page_search";
    static AddStr = "add";
    static ManageRoleStr = "manage_role";
    static MessengerStr = "messenger";

    static Home = new PageEnum(PageEnum.HomeStr);
    static Login = new PageEnum(PageEnum.LoginStr);
    static Register = new PageEnum(PageEnum.RegisterStr);
    static Profil = new PageEnum(PageEnum.ProfilStr);
    static Project = new PageEnum(PageEnum.ProjectStr);
    static CreateProject = new PageEnum(PageEnum.CreateProjectStr);
    static Search = new PageEnum(PageEnum.SearchStr);
    static Add = new PageEnum(PageEnum.AddStr);
    static ManageRole = new PageEnum(PageEnum.ManageRoleStr);
    static Messenger = new PageEnum(PageEnum.MessengerStr);

    constructor(name) {
        super(name);
    }
}