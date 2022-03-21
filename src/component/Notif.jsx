import HeadLittleProfil from "./HeadLittleProfil";

function Notif(){
    let test = {
        name:"Théo",
        profil:""
    }

    let color = {
        primary: "#007CDC",
        light: "#D3E5FF",
        dark: "#003056"
    }
    return <div style={{"background-color":color.light}}>
        <HeadLittleProfil name={test.name} profil={test.profil}>
            
        </HeadLittleProfil>
        <p>Vous invite à rejoindre le Projet Google</p>
    </div>
}
export default Notif;