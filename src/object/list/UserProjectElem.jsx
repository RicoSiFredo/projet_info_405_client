import { Button } from "react-bootstrap";
import PageEnum from "../../enum/PageEnum";

function UserProjectElem({action, user, updatePage}){
    function openProfil(){
        console.log(user.project)
        user.project.set(action.project);
        console.log(user)
        updatePage(PageEnum.Project);
    }
    return <div>
        <p>{action.project.name}</p>
        <Button onClick={openProfil} variant="primary">Voir</Button>
    </div>
}
export default UserProjectElem;