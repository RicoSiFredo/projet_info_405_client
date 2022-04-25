import Notif from "../component/Notif";
import React from "react"
import NotifList from "../list/NotifList";

function NotifPage({user}){
    console.log(user.notifList)
    return <div>
        <NotifList listNotif={user.notifList}>

        </NotifList>
    </div>
}
export default NotifPage;