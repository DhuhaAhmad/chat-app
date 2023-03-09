import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

function Chats() {

  const [chats,setChats]=useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)


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



const handleSelect =(u)=>{
   dispatch({type:"CHANGE_USER",payload:u})
  //  console.log('payload=>',u)
}
  return (
    <>
      <div className="chats">
    
        {
          Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>{
            return  (
            <div className="userChat" key={chat[0]}  onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>)
          })
        }


      </div>
    </>
  );
}

export default Chats;
