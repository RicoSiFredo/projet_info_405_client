import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import User from './object/User';
import PageEnum from './enum/PageEnum';
import Register from './page/Register';
import Home from './page/Home';
import Login from './page/Login';
import Data from './utils/Data';
import HTTP from './utils/HTTP';
import Constant from './utils/Constant';
import Profil from './page/Profil';
import CreateProject from './page/CreateProject';
import Search from './page/Search';
import Project from './page/Project';
import Eats from './object/base/Eats';
import { Button } from 'react-bootstrap';
import AddParticipant from './page/AddParticipant';
import ManageRole from './page/ManageRole';
import NotifPage from './page/NotifPage';
import Messenger from './page/Messenger';

const NOTIF_FETCH = 15000

function App() {
    const [page, updatePage] = useState(PageEnum.Home);
    const [pageList, updatePageList] = useState([]);
    const [user, updateUser] = useState(new User());
    const [log, updateLog] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(user.logged) {
                user.getNotif();
            }
        }, NOTIF_FETCH);
        return () => clearInterval(interval);
    }, []);
    

    useEffect(function(){
        // Si il y a changement de l'utilisateur on regarde si il y a des notifs
        if(log){
            user.getNotif();
        }
    }, [log])

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
                    updateLog(true)
                }
            )
            // on demande au server une session
        }
    }, []);

    useEffect(function(){
        if(pageList.length == 0||
            !pageList[pageList.length - 1].equals(page)){
            pageList.push(page);
            updatePageList([...pageList]);
        }
    }, [page]);

    function back(){
        if(pageList.length>1){
            pageList.splice(pageList.length - 1, 1)
            updatePage(pageList[pageList.length - 1]);
            pageList.splice(pageList.length - 1, 1)
            updatePageList([...pageList]);
        }
    }

    function refreshPage(){
        updateUser(Eats.fakeUpdate(user));
        // fait croire à un changement
    }

    user.update = refreshPage;
    user.updatePage = updatePage;
    // Des que l'utilisateur est mis à jour on appel la fonction refreshPage
    // Permet de recharger la page a chaque appel

    let res;
    if(page.equals(PageEnum.Home)){
        res = <Home user={user} updatePage={updatePage}></Home>;
    }
    else if(page.equals(PageEnum.Login)){
        res = <Login back={back} user={user} updatePage={updatePage}></Login>;
    }
    else if(page.equals(PageEnum.Register)){
        res = <Register back={back} user={user} updatePage={updatePage}></Register>;
    }
    else if(page.equals(PageEnum.Profil)){
        res = <Profil back={back} user={user.user.get()} updatePage={updatePage}></Profil>;
    }
    else if(page.equals(PageEnum.CreateProject)){
        res = <CreateProject back={back} user={user} updatePage={updatePage}></CreateProject>;
    }
    else if(page.equals(PageEnum.Search)){
        res = <Search back={back} user={user} updatePage={updatePage}></Search>;
    }
    else if(page.equals(PageEnum.Project)){
        res = <Project back={back} project={user.project.get()} user={user} updatePage={updatePage}></Project>;
    }
    else if(page.equals(PageEnum.Add)){
        res = <AddParticipant back={back} updatePage={updatePage} project={user.project.get()}>

        </AddParticipant>
    }
    else if(page.equals(PageEnum.ManageRole)){
        res = <ManageRole back={back} updatePage={updatePage} project={user.project.get()}>

        </ManageRole>
    }
    else if(page.equals(PageEnum.Notif)){
        res = <NotifPage user={user} back={back} updatePage={updatePage}>

        </NotifPage>
    }
    else if(page.equals(PageEnum.Messenger)){
        res = <Messenger back={back} user={user} updatePage={updatePage}></Messenger>;
    }
    let backButton;
    if(pageList.length>1){
        backButton = <Button onClick={back} variant='primary'>Retour</Button>
    }
    function chercher(){
        updatePage(PageEnum.Search);
    }
    return <div>
        {backButton}
        <Button onClick={chercher} variant='primary'>Rechercher</Button>
        {res}
    </div>
}

export default App;
