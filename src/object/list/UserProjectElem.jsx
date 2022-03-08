import { Button } from "react-bootstrap";
import PageEnum from "../../enum/PageEnum";

function UserProjectElem({action, user, updatePage}){
    function openProfil(){
        action.project.update = user.update;
        user.project.set(action.project);
        updatePage(PageEnum.Project);
    }
    return <div>
        <p>{action.project.name}</p>
        <Button onClick={openProfil} variant="primary">Voir</Button>
    </div>
}
export default UserProjectElem;