import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import User from './object/User';
import { Button } from 'react-bootstrap';
import PageEnum from './enum/PageEnum';
import Register from './page/Register';
import Home from './page/Home';
import Login from './page/Login';
import Data from './utils/Data';
import HTTP from './utils/HTTP';
import Constant from './utils/Constant';
import Profil from './page/Profil';
import ObjectEats from './object/base/ObjectEats';

function App() {
    const [page, updatePage] = useState(PageEnum.Home);
    const [user, updateUser] = useState(new User());

    useEffect(function(){
        // Cette fonction s'excute uniquement au lancement de la page
        // car [], la fonction s'excute au changement de 1 des éléments de la liste
        // Il n'y a aucun donc exec que au debut
        
        let refreshToken = Data.refreshToken();
        if(refreshToken!=undefined&&refreshToken!=""){
            // le token existe
            HTTP.queryPost(
                Constant.SERVER_URL + "user/login_token",
                {
                    refresh_token: refreshToken
                },
                function(err){

                },
                function(data){
                    let fait = user.login(data);
                    if(fait){

                    }
                }
            )
            // on demande au server une session
        }
    }, []);

    function refreshPage(){
        updateUser(ObjectEats.fakeUpdate(user));
        // fait croire à un changement
    }

    user.update = refreshPage;
    // Des que l'utilisateur est mis à jour on appel la fonction refreshPage
    // Permet de recharger la page a chaque appel

    if(page.equals(PageEnum.Home)){
        return <Home user={user} updatePage={updatePage}></Home>;
    }
    else if(page.equals(PageEnum.Login)){
        return <Login user={user} updatePage={updatePage}></Login>;
    }
    else if(page.equals(PageEnum.Register)){
        return <Register user={user} updatePage={updatePage}></Register>;
    }
    else if(page.equals(PageEnum.Profil)){
        return <Profil user={user} updatePage={updatePage}></Profil>;
    }
}

export default App;
