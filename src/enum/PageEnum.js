import EatsEnum from "../object/base/EatsEnum";

export default class PageEnum extends EatsEnum {

    static HomeStr = "page_home"
    static LoginStr = "page_login"
    static RegisterStr = "page_register"
    static ProfilStr = "page_profil";
    static ProjetStr = "page_projet";

    static Home = new PageEnum(PageEnum.HomeStr);
    static Login = new PageEnum(PageEnum.LoginStr);
    static Register = new PageEnum(PageEnum.RegisterStr);
    static Profil = new PageEnum(PageEnum.ProfilStr);
    static Projet = new PageEnum(PageEnum.ProjetStr);

    constructor(name) {
        super(name);
    }
}