import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";

function Home() {
    return ( <>
    <div className="home">
        <div className="container">
            <Sidebar/>
            <ChatRoom/>
        </div>
    </div>

    </> );
}

export default Home;