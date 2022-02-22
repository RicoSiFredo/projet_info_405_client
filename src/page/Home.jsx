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
            <Button variant="primary" onClick={login}>Login</Button>
            <Button variant="primary" onClick={register}>Register</Button>
        </div>
    }
    else {
        function logout(){
            user.logout();
        }
        function profil(){
            updatePage(PageEnum.Profil);
        }
        button = <div>
            <Button variant="primary" onClick={logout}>Logout</Button>
            <Button variant="primary" onClick={profil}>Profil</Button>
        </div>
    }
    return <div>
        <p>Home</p>
        {button}
    </div>
}
export default Home;