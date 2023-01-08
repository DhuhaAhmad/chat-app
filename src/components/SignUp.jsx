import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, storage,db } from "../firebase";
import { useState } from "react";

function SignUp() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dispalyName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    // console.log(file.name)

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
        console.log(response.user);
      //  name image in storage - used dispaly name -
      const storageRef = ref(storage, dispalyName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              dispalyName,
              photoURL: downloadURL
            });


              // Add user to database
            await setDoc(doc(db,"users",response.user.uid),{
              uid:response.user.uid,
              dispalyName,
              email,
              photoURL: downloadURL
            })

            await setDoc(doc(db,"userChats",response.user.uid),{})
            navigate("/")

            console.log("********** 51 ************")

          });
        }
      );

      
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat App</span>
          <span className="title">Sign Up</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="dispaly name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <img src="https://img.icons8.com/color/100/null/add-image.png" />
              <span>Add avatar</span>
            </label>

            <button>Sign up</button>
            {err && <span>Somthing went wrong</span>}
          </form>
          
          <p>You do have an account? <Link to={"/login"}>Login</Link> </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
