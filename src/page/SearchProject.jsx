import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import PageEnum from "../enum/PageEnum";
import ErrorEats from "../object/base/ErrorEats";
import Data from "../utils/Data";
import Response from "../utils/Response";

function SearchProject({back, user, updatePage}){
    const [name, updateName] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function chercher(){
        user.makeRequest(
            '/user/search/project', 
            {
                access_token: Data.accessToken(),
                name: name,
            },
            function(error){
                updateError(ErrorEats.WENT_WRONG);
            },
            function(response){
                if(Response.isSuccessResponse(response)){
                    back();
                }
                else {
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                }
            }
        )
    }
    function changeValueName(e){
        updateName(e.target.value);
    }
    
    /*
    <SkillBlock></SkillBlock>
    */
    return <div>
        <Button variant="primary" onClick={back}>Home</Button>
        <Field name={"name"} label="Nom" val={name} changeValue={changeValueName}></Field>
        <Button variant="primary" onClick={chercher}>Chercher</Button>
    </div>
}
export default SearchProject;