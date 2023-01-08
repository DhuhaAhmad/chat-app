import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import "./style.scss"

function App() {
  const {currentUser} = useContext(AuthContext)

  // Protevted component
  const ProtevtedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to={"/login"}/>
    }
  }
  return (
    <>   
    <BrowserRouter>
<Routes>
  <Route path="/">
    <Route index element={
    <ProtevtedRoute>
      <Home/>
      </ProtevtedRoute>
    }/>
    <Route exact path="signup" element={<SignUp/>}/>
    <Route exact path="login" element={<LogIn/>}/>

  </Route>
</Routes>
    </BrowserRouter>
  
    </>
 
  );
}

export default App;
