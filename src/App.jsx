import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
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
import ProjectFrame from './page/Project';
import Eats from './object/base/Eats';
import { Button } from 'react-bootstrap';
import AddParticipant from './page/AddParticipant';
import ManageRole from './page/ManageRole';
import NotifPage from './page/NotifPage';
import Messenger from './page/Messenger';
import Header from './component/Header';
import NotifList from './list/NotifList';
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Offre from './page/Offre';

const NOTIF_FETCH = 15000

function App() {
    const [page, updatePage] = useState(PageEnum.Home);
    const [pageList, updatePageList] = useState([]);
    const [user, updateUser] = useState(new User());
    const [log, updateLog] = useState(false);
    const [notif, updateNotif] = useState(false);
    const [search, updateSearch] = useState("");

    const [ locationKeys, setLocationKeys ] = useState([])
    const navigate = useNavigate()

    useEffect(function(){
        // Si il y a changement de l'utilisateur on regarde si il y a des notifs
        if(log){
            user.getMyNotif();
        }
        else {
            updateNotif(false);
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
                    if(data["status"]=="success"){
                        let fait = user.login(data);
                        updateLog(true)
                    }
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

    user.back = back;

    /*let res;
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
        res = <Profil back={back} rootUser={user} user={user.user.get()} updatePage={updatePage}></Profil>;
    }
    else if(page.equals(PageEnum.CreateProject)){
        res = <CreateProject back={back} user={user} updatePage={updatePage}></CreateProject>;
    }
    else if(page.equals(PageEnum.Search)){
        res = <Search search={search} back={back} user={user} updatePage={updatePage}></Search>;
    }
    else if(page.equals(PageEnum.Project)){
        res = <ProjectFrame back={back} rootUser={user} project={user.project.get()} user={user} updatePage={updatePage}></ProjectFrame>;
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
    }*/
    let head = <Header search={search} updateSearch={updateSearch} user={user} updateNotif={updateNotif} notif={notif} navigate={navigate}></Header>;
    let notifElem;
    if(notif){
        notifElem = 
        <div>
            <NotifList
                rootUser={user}
                you={true}
                navigate={navigate} 
                list={user.notifList}>

            </NotifList>
        </div>
    }
    return <div>
        {
            head
        }

        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <Routes>
            <Route exact path="/login" element={<Login navigate={navigate} user={user}></Login>}></Route>
            <Route exact path="/register" element={<Register navigate={navigate} user={user}></Register>}></Route>
            <Route path="/message/:id" element={<Messenger user={user}></Messenger>}></Route>
            <Route exact path="/profil/:id" element={<Profil navigate={navigate} rootUser={user}></Profil>}></Route>
            <Route exact path="/project/:id" element={<ProjectFrame navigate={navigate} rootUser={user}></ProjectFrame>}></Route>
            <Route path="/search/:search" element={<Search navigate={navigate} rootUser={user}></Search>}></Route>
            <Route path="/search" element={<Search navigate={navigate} rootUser={user}></Search>}></Route>
            <Route exact path="/offre/:id" element={<Offre navigate={navigate} rootUser={user}></Offre>}></Route>
            <Route exact path="/" element={<Home navigate={navigate} user={user} updatePage={updatePage}></Home>}></Route>
        </Routes>
    </div>
}


function Home2() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }

  
  function Users2() {
    return <h2>Users</h2>;
  }
export default App;
