import { Button } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import React from "react"
import { Link } from "react-router-dom";

function Home({user, navigate, updatePage}){
    let button;
    if(!user.logged){
        function login(){
            navigate("/login");
        }
        function register(){
            navigate("/register");
        }
        button = <div >
            <Button className="m-1" variant="primary" onClick={login}>Connexion</Button>
            <Button className="m-1" variant="primary" onClick={register}>Inscription</Button>
        </div>
    }
    else {
        function logout(){
            navigate("/");
            user.logout();
        }
        button = <div >
            <Link to={"/"}>
                <Button className="m-1" variant="primary" onClick={logout}>Déconnexion</Button>
            </Link>
            <Link to={"/profil/"+user.id_str}>
                <Button className="m-1" variant="primary">Profil</Button>
            </Link>
            <Link to={"/message/-1"}>
                <Button className="m-1" variant="primary">Messages</Button>
            </Link>
        </div>
    }
    return <div>
                <div className="card m-2 p-2 d-flex align-items-center">
                    <h2 >Page d'accueil</h2>
                    {button}
                </div>
                <div className="card m-2 p-2 d-flex align-items-center">
                    <h2>On mets quoi là ?</h2>
                </div>
            </div>
}
export default Home;