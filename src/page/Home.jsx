import { Button } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";

function Home({user, updatePage}){
    let button;
    if(!user.logged){
        function register(){
            updatePage(PageEnum.Register);
        }
        function login(){
            updatePage(PageEnum.Login);
        }
        button = <div>
            <Button variant="primary" onClick={login}>Connexion</Button>
            <Button variant="primary" onClick={register}>S’enregistrer</Button>
        </div>
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
        button = <div>
            <Button variant="primary" onClick={logout}>Déconnexion</Button>
            <Button variant="primary" onClick={profil}>Profil</Button>
            <Button variant="primary" onClick={notif}>Notification</Button>
        </div>
    }
    return <div>
        <p>Page d'accueil</p>
        {button}
    </div>
}
export default Home;