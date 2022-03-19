import Message from "./Message";

function Messenger(){
    return (
    <div className="Messsenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <h1>menu</h1>
            </div>
        </div>

        <div className="chatBox">
            <div className="chatBoxWrapper">
                <h1>box</h1>
                <div className="chatBoxTop">
                    <Message/>
                </div>
                <div className="cahtBoxBottom">
                    <textarea className="chatMessageInput" placeholder="ecrivez quelque chose..."></textarea>
                    <button className="chatSubmitButton">Envoyer</button>
                </div>
            </div>
        </div>

        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <h1>online</h1>
            </div>
        </div>
    </div>
    )
}
export default Messenger;