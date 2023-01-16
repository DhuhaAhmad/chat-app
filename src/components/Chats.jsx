import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Chats() {

  const [chats,setChats]=useState([])

  const {currentUser} = useContext(AuthContext)

  useEffect(()=>{

    const getAllChats =()=>{
         const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())
  }); 

  return ()=>{
    unsub()
  }
    }
  

 

  currentUser.uid && getAllChats()

},[currentUser.uid])

  return (
    <>
      <div className="chats">
    
        {
          Object.entries(chats)?.map(chat=>{
            return  (
            <div className="userChat" key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>)
          })
        }


      </div>
    </>
  );
}

export default Chats;
