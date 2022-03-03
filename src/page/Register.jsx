import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PageEnum from "../enum/PageEnum";
import ErrorEats from "../object/base/ErrorEats";
import Constant from "../utils/Constant";
import HTTP from "../utils/HTTP";
import Response from "../utils/Response";

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
    return <div>
        <p>Register</p>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Label>Firstname</Form.Label>
            <Form.Control value={firstname} onInput={eventFirstname} type="text" placeholder="Firstname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Label>Lastname</Form.Label>
            <Form.Control value={lastname} onInput={eventLastname} type="text" placeholder="Lastname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onInput={eventEmail} type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="register_password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password}  onInput={eventPassword} type="password" placeholder="Password" />
        </Form.Group>
        <p>{error.toString()}</p>
        <Button variant="primary" onClick={register}>Register</Button>
    </div>
}
export default Register;