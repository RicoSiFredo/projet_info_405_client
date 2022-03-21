import { Button } from "react-bootstrap";
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
        <div>
            <Button variant="primary rounded-pill">Accepeter</Button>
            <Button variant="outline-primary rounded-pill">Refuser</Button>
        </div>
    </div>
}
export default Notif;