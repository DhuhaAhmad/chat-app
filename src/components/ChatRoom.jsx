import Input from "./Input";
import Messages from "./Messages";

function ChatRoom() {
    return ( <>
    <div className="chatroom">
        <div className="chatInfo">
            <span>name</span>
            <div className="chatIcons">
            <img src="https://img.icons8.com/ios-filled/400/null/video-call.png"/>   
            <img src="https://img.icons8.com/tiny-glyph/400/null/add-user-male.png"/> 
            <img src="https://img.icons8.com/ios-filled/400/null/more.png"/>
            </div>
        </div>
        <Messages/>
       <Input/>
    </div>
    
    </> );
}

export default ChatRoom;