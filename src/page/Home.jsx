import { Button } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import React from "react"

function Home({user, updatePage}){
    let button;
    if(!user.logged){
        
    }
    else {
        function logout(){
            user.logout();
        }
        function profil(){
            user.user.set(user);
            updatePage(PageEnum.Profil);
        }
        function notif(){
            updatePage(PageEnum.Notif);
        }
        function messages(){
            updatePage(PageEnum.Messenger);
        }
        button = <div >
            <Button className="m-1" variant="primary" onClick={logout}>Déconnexion</Button>
            <Button className="m-1" variant="primary" onClick={profil}>Profil</Button>
            <Button className="m-1" variant="primary" onClick={notif}>Notification</Button>
            <Button className="m-1" variant="primary" onClick={messages}>Messages</Button>
        </div>
    }
    return <div className="card m-2 p-2 d-flex align-items-center">
        <h2 >Page d'accueil</h2>
        {button}
    </div>
}
export default Home;