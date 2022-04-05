import Notif from "../component/Notif";
import ListNotif from "../object/list/ListNotif";

function NotifPage({user}){
    console.log(user.notifList)
    return <div>
        <ListNotif listNotif={user.notifList}>

        </ListNotif>
    </div>
}
export default NotifPage;