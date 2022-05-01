import { useState } from "react";
import { Form } from "react-bootstrap";
import React from "react"
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";
import Form405 from "../component/Form405";

function Login({user, back, navigate}){
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState(""); 
    // variable qui correspond à l'erreur
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function login(){
        updateError(ErrorEats.NO_ERROR);
        // pour l'instant aucune erreur
        HTTP.queryPost(
            Constant.SERVER_URL + "user/login",
            {
                email: email,
                password: password
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG)
                // Il y a eu un problème
            },
            function(response){
                if(Response.isSuccessResponse(response)) {
                    // la requete est un succès
                    user.login(response);
                    navigate("/")
                }
                else {
                    console.log(response)
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                    // On recupère l'erreur de la requete
                }
            }
        );
    }
    function eventPassword(e){
        updatePassword(e.target.value);
    }
    function eventEmail(e){
        updateEmail(e.target.value);
    }
    let inputContent = <div>
        <Form.Group className="mb-3" controlId="login_email">
            <Form.Control value={email} onInput={eventEmail} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login_password">
            <Form.Control value={password}  onInput={eventPassword} type="password" placeholder="Mot de passe" />
        </Form.Group>
    </div> 
    return <div>
        <Form405 
            error={error}
            onSubmit={login}
            title="Connexion" 
            info="Il est nécessaire d'avoir un compte pour créer un projet ou rejoindre un projet."
            content={inputContent}>

        </Form405>
    </div>
}
export default Login;