import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import React from "react"
import Response from "../utils/Response";
import Form405 from "../component/Form405";

function Register({back, user, updatePage}){
    const [email, updateEmail] = useState("");
    const [firstname, updateFirstname] = useState("");
    const [lastname, updateLastname] = useState("");
    const [password, updatePassword] = useState(""); 
    // variable qui correspond à l'erreur
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function register(){
        updateError(ErrorEats.NO_ERROR);
        // pour l'instant aucune erreur
        HTTP.queryPost(
            Constant.SERVER_URL + "user/register",
            {
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
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
    function eventLastname(e){
        updateLastname(e.target.value);
    }
    function eventFirstname(e){
        updateFirstname(e.target.value);
    }
    let content = <div>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Control value={firstname} onInput={eventFirstname} type="text" placeholder="Prénom" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Control value={lastname} onInput={eventLastname} type="text" placeholder="Nom" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Control value={email} onInput={eventEmail} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_password">
            <Form.Control value={password}  onInput={eventPassword} type="password" placeholder="Mot de passe" />
        </Form.Group>
    </div>
    return <div>
        <Form405
            error={error}
            onSubmit={register}
            title="Inscription"
            info="Il est nécessaire d'avoir un compte pour créer un projet ou rejoindre un projet."
            content={content}>

        </Form405>
    </div>
}
export default Register;