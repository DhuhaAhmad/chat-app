import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import {v4 as uuid} from "uuid"

function Input() {

    const [text,setText]=useState("")
    const [img,setImg]=useState(null)
    const [err,setErr]=useState(false)

    const {currentUser}=useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async()=>{

        if(img){
            const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          setErr(true);
          // Handle unsuccessful uploads
          console.log(error)
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
                messages:arrayUnion({
                    id:uuid(),
                    text,
                    senderId:currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL
                })
            })


          });
        }
      );


        }else{
            await updateDoc(doc(db,"chats",data.chatId),{
                messages:arrayUnion({
                    id:uuid(),
                    text,
                    senderId:currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })


        setText("")
        setImg(null)
    }

    const handleKeyDown = (e)=>{
        if(e.key==="Enter"){
            handleSend()
        }
    }
    return (<>
    <div className="inputMsg"
        onKeyDown={e=>handleKeyDown(e)}

    >
        <input type="text" placeholder="Write a message.." onChange={e=>setText(e.target.value)}
        value={text}
        />
        <div className="send">
            <input type="file"  id="file" style={{display:"none"}} onChange={e=>setImg(e.target.files[0])}
            
            />
            <label htmlFor="file">
            <img src="https://img.icons8.com/material-outlined/100/null/image.png"/>
            </label>
            <button id="send" onClick={handleSend}

            ><img src="https://img.icons8.com/ios-glyphs/400/null/filled-sent.png"/></button>
        </div>
    </div>
    </> );
}

export default Input;