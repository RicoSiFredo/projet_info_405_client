import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";

function Login({user, updatePage}){
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState(""); 
    // variable qui correspond à l'erreur
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function back(){
        updatePage(PageEnum.Home);
    }
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
        <p>Login</p>
        <Form.Group className="mb-3" controlId="login_email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onInput={eventEmail} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login_password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password}  onInput={eventPassword} type="password" placeholder="Password" />
        </Form.Group>
        <p>{error.toString()}</p>
        <Button variant="primary" onClick={login}>Login</Button>
        <Button variant="primary" onClick={back}>Home</Button>
    </div>
}
export default Login;