function ProjectActionElem({action}){
    return <div>
        <p>{action.user.firstname + " " + action.user.lastname}</p>
        <p>Role : {action.role.name}</p>
    </div>
}
export default ProjectActionElem;