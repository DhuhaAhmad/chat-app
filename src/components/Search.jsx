import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  doc
  
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const queri = query(usersRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(queri);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
    // console.log(e.code);
  };

  const handleSelect = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      console.log(res);

      if (!res.exists()) {
        // create a chat doc in chats collectin
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        // create user chats in userChats collection
        await updateDoc(
          doc(db, "userChats", currentUser.uid), {
            [combinedID + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedID + ".date"]: serverTimestamp(),
          }
        );
        await updateDoc(
          doc(db, "userChats", user.uid), {
            [combinedID + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedID + ".date"]: serverTimestamp(),
          }
        );
      }

      //userchat structure

      //  userChats{
      //   currentUserId{
      //   combinedID{
      //   userInfo{
      //   dn,img,id
      //   },
      //   lastMessage:"",
      //   date:
      //   }
      //   }
      //   }

      console.log("selected");
    } catch (error) {
      // setErr(error);
    }
    setUser(null)
    setUsername("")
  };
  return (
    <>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search.."
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
        {err && <span>User Not Found + {err}</span>}
        {user && (
          <div
            className="userChat"
            style={{ border: "#000 solid 2px" }}
            onClick={handleSelect}
          >
            <img src={user.photoURL} />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
              <p>hello</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
