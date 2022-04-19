import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import React from "react"
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";

function Login({user, back, updatePage}){
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
                    back();
                }
                else {
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
    return <div>
        <p>Connexion</p>
        <Form.Group className="mb-3" controlId="login_email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onInput={eventEmail} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login_password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control value={password}  onInput={eventPassword} type="password" placeholder="Mot de passe" />
        </Form.Group>
        <p>{error.toString()}</p>
        <Button variant="primary" onClick={login}>Connexion</Button>
    </div>
}
export default Login;