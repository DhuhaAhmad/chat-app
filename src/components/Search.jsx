import { useState } from "react";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async() => {
    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const queri = query(usersRef, where("displayName", "==", userName));
   try {
    const querySnapshot = await getDocs(queri);
  
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setUser(doc.data())
});
   } catch (error) {
    setErr(true)
   }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
    // console.log(e.code);
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
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>
          {err && <span>User Not Found</span>}
        {user && <div className="userChat" style={{border:"#000 solid 2px"}}>
          <img src="https://img.icons8.com/doodle/100/null/user.png" />
          <div className="userChatInfo">
            <span>name</span>
            <p>hello</p>
          </div>
        </div>}

      </div>
    </>
  );
}

export default Search;
