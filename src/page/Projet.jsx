function Projet({user, updatePage}){
    function back(){
        updatePage(PageEnum.Home);
    }
    return <div>
        <Button variant="primary" onClick={login}>Login</Button>
        <Button variant="primary" onClick={back}>Home</Button>
    </div>
}
export default Projet;