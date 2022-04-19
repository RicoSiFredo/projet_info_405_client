import PageEnum from "../enum/PageEnum";
import Utils from "../utils/Utils";
import React from "react"
import { Search } from "react-bootstrap-icons";

function Header({user}){

    let button;
    if (user.logged){
        button = <div>
            <button className='btn btn-primary me-3'>Créer un Projet</button>
            <button className='btn btn-primary me-3'>Rejoindre un Projet</button>
        </div>
    }
    else {
        let titleEnregistrer = "S'enregistrer";
        let titleConnexion = "Connexion";
        function connexion(){
            Utils.changeUrl(titleConnexion, "/login");
            user.updatePage(PageEnum.Login);
        }
        function enregistrer(){
            Utils.changeUrl(titleEnregistrer, "/register");
            user.updatePage(PageEnum.Register);
        }
        button = <div>
            <button className='btn btn-primary me-3' onClick={enregistrer}>{titleEnregistrer}</button>
            <button className='btn btn-primary me-3' onClick={connexion}>{titleConnexion}</button>
        </div>
    }
    function home(){
        Utils.changeUrl("Accueil", "/");
        user.updatePage(PageEnum.Home);
    }
    function back(){
        Utils.changeUrl("Accueil", "/");
        user.back();
    }
    return (
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand ps-2 click" onClick={home}>
                <button className='btn btn-primary me-3' onClick={back}>Retour</button>
                <img src="logo_usmb.png" width="30" height="30" className="align-top" alt=""/>
                <h4 className="p-3 d-inline">Projet 405</h4>
            </div>
            <div>
                <div className="input-group">
                    <div>
                        <input type="search" id="form1" className="form-control" placeholder="Rechercher" />
                    </div>
                    <button type="button" className="d-flex align-items-center justify-content-center btn btn-primary">
                        <Search></Search>
                    </button>
                </div>
            </div>
            <div>
                {button}
            </div>
        </nav>
    )
}
export default Header;